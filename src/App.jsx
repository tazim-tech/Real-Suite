import { useEffect, useRef, useState } from 'react'
import {
  CHECK_STEPS,
  ECR_CHECK,
  ECR_VERSIONS,
  FEED,
  GROUPS,
  INITIAL_LOG,
  INITIAL_PLAN,
  LEAD_LABEL,
  LEAD_RANK,
  LEADS,
  PHONE,
  PLATFORMS,
  PLATFORM_NOTE,
  PROPERTIES,
  SLOTS,
  STATUS_WORD,
  THREADS,
  VERSIONS,
  blockReason,
  modeFor,
  propertyById,
} from './data.js'

function Block({ text }) {
  if (!text) return null
  return <div className="prose"><p>{text}</p></div>
}

async function copyText(text, setToast) {
  try {
    await navigator.clipboard.writeText(text)
    setToast('Copied.')
  } catch {
    setToast('Select the text and copy it. The browser blocked the clipboard.')
  }
}

function Flyer({ property, mode, facts, reason }) {
  const blocked = mode === 'blocked'
  return (
    <article className={`flyer ${mode}`} aria-label={`Flyer for ${property.flyerTitle}`}>
      <header>
        <div className="brand-lock">
          <div className="mark" aria-hidden="true">SK</div>
          <div className="who">
            <strong>Shivakumar</strong>
            <span>Homes and plots, Chennai</span>
          </div>
        </div>
      </header>
      <div className="flyer-band">
        <span className="flyer-kind">{property.kind}</span>
        <h3>{property.flyerTitle}</h3>
      </div>
      {mode === 'held' && <p className="holdbar">Do not circulate</p>}
      {blocked ? (
        <p className="flyer-block">{reason}</p>
      ) : (
        <>
          <p className="flyer-price">{property.price}</p>
          <ul className="facts">
            {facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </>
      )}
      <footer className="flyer-foot">
        <span>{PHONE}</span>
        <span>WhatsApp · Instagram · LinkedIn</span>
      </footer>
    </article>
  )
}

function App() {
  const [session, setSession] = useState(0)
  return <Desk key={session} onReset={() => setSession((n) => n + 1)} />
}

function Desk({ onReset }) {
  const [view, setView] = useState('today')
  const [focusId, setFocusId] = useState('anna-nagar')
  const [leadId, setLeadId] = useState('meena')
  const [threadId, setThreadId] = useState('anitha')
  const [plan, setPlan] = useState(INITIAL_PLAN)
  const [leads, setLeads] = useState(LEADS)
  const [threads, setThreads] = useState(THREADS)
  const [checked, setChecked] = useState({ ecr: false })
  const [log, setLog] = useState(INITIAL_LOG)
  const [drafts, setDrafts] = useState({})
  const [replies, setReplies] = useState({})
  const [toast, setToast] = useState('')
  const [run, setRun] = useState(null)
  const timer = useRef(null)

  useEffect(() => {
    if (!toast) return undefined
    const t = setTimeout(() => setToast(''), 3400)
    return () => clearTimeout(t)
  }, [toast])

  useEffect(() => () => clearInterval(timer.current), [])

  function pushLog(text) {
    setLog((prev) => [{ time: 'Just now', text }, ...prev])
  }

  function openProperty(id) {
    setFocusId(id)
    setView('properties')
  }

  function openLead(id) {
    setLeadId(id)
    setView('leads')
  }

  function approve(id) {
    const item = plan.find((entry) => entry.id === id)
    if (!item || item.status !== 'draft') return
    setPlan((prev) => prev.map((entry) => (
      entry.id === id ? { ...entry, status: 'queued' } : entry
    )))
    const property = propertyById(item.propertyId)
    pushLog(`Approved ${property.short} for ${item.platform} at ${item.time}. The flyer goes with it.`)
    setToast(`${property.short} will post at ${item.time} on ${item.platform}, with the flyer.`)
  }

  function removeFromPlan(id) {
    const item = plan.find((entry) => entry.id === id)
    if (!item || item.status === 'posted') return
    setPlan((prev) => prev.filter((entry) => entry.id !== id))
    setToast('Taken off the day. The copy is still on the property.')
  }

  function queueVersion(propertyId, platform) {
    const property = propertyById(propertyId)
    if (modeFor(property, checked) !== 'ready') {
      setToast('This property is not ready to post.')
      return
    }
    const existing = plan.find((entry) => entry.propertyId === propertyId && entry.platform === platform)
    if (existing) {
      const when = existing.day === 'today' ? 'today' : 'tomorrow'
      setToast(`${platform} for ${property.short} is already on the plan, ${when} at ${existing.time}.`)
      return
    }
    const slot = SLOTS.find((candidate) => !plan.some((entry) => (
      entry.day === candidate.day && entry.time === candidate.time
    )))
    if (!slot) {
      setToast('Today and tomorrow already have 2 posts each.')
      return
    }
    setPlan((prev) => [...prev, {
      id: `q-${propertyId}-${platform}-${slot.day}`,
      day: slot.day,
      time: slot.time,
      propertyId,
      platform,
      status: 'queued',
    }])
    const when = slot.day === 'today' ? 'today' : 'tomorrow'
    pushLog(`Set ${property.short} for ${platform}, ${when} at ${slot.time}, with the flyer.`)
    setToast(`${property.short} is set for ${slot.time} ${when}, on ${platform}, with the flyer.`)
  }

  function runCheck(id) {
    if (run) return
    let step = 0
    setRun({ id, step: 0 })
    clearInterval(timer.current)
    timer.current = setInterval(() => {
      step += 1
      if (step >= CHECK_STEPS.length) {
        clearInterval(timer.current)
        setRun(null)
        setChecked((prev) => ({ ...prev, [id]: true }))
        pushLog('Checked the ECR villa. Held it. The patta is still in the late owner name, and the road is 18 ft.')
        setToast('ECR villa is on hold. It will not be posted.')
      } else {
        setRun({ id, step })
      }
    }, 700)
  }

  function sendLead(id) {
    const lead = leads.find((item) => item.id === id)
    if (!lead || lead.status === 'sent' || !lead.draft) return
    const text = drafts[id] ?? lead.draft
    setLeads((prev) => prev.map((item) => (
      item.id === id ? { ...item, status: 'sent' } : item
    )))
    if (lead.threadId) {
      setThreads((prev) => prev.map((thread) => (
        thread.id === lead.threadId
          ? { ...thread, unread: false, messages: [...thread.messages, { from: 'me', text }] }
          : thread
      )))
    }
    pushLog(`Sent the follow-up to ${lead.name}.`)
    setToast(`Follow-up sent to ${lead.name}.`)
  }

  function sendReply(id) {
    const thread = threads.find((item) => item.id === id)
    if (!thread || thread.messages.some((message) => message.from === 'me')) return
    const text = replies[id] ?? thread.suggestion
    setThreads((prev) => prev.map((item) => (
      item.id === id
        ? { ...item, unread: false, messages: [...item.messages, { from: 'me', text }] }
        : item
    )))
    if (thread.leadId) {
      setLeads((prev) => prev.map((lead) => (
        lead.id === thread.leadId ? { ...lead, status: 'sent' } : lead
      )))
    }
    pushLog(`Sent the ${thread.channel} reply to ${thread.name}.`)
    const filed = thread.leadId ? ` ${thread.name} is on the lead list.` : ''
    setToast(`Reply sent to ${thread.name} on ${thread.channel}.${filed}`)
  }

  const attention = leads.filter((lead) => lead.status === 'overdue' || lead.status === 'new' || lead.status === 'hold').length
  const unread = threads.filter((thread) => thread.unread).length
  const nextLead = leads
    .filter((lead) => lead.status === 'overdue' || lead.status === 'new' || lead.status === 'hold')
    .sort((a, b) => LEAD_RANK[a.status] - LEAD_RANK[b.status])[0]
  const evening = plan.find((entry) => entry.day === 'today' && entry.time === '7:30 pm')
  const onToday = plan.filter((entry) => entry.day === 'today' && (entry.status === 'posted' || entry.status === 'queued')).length
  const enquiries = leads.filter((lead) => lead.fromPost && lead.status !== 'sent')

  const nav = [
    ['today', 'Today', null],
    ['groups', 'Groups', null],
    ['properties', 'Properties', null],
    ['flyers', 'Flyers', null],
    ['posts', 'Posts', null],
    ['leads', 'Leads', attention || null],
    ['messages', 'Messages', unread || null],
  ]

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <strong>Real Suite</strong>
          <span>Shivakumar, Chennai</span>
        </div>
        <nav className="nav" aria-label="Sections">
          {nav.map(([id, label, count]) => (
            <button
              key={id}
              type="button"
              aria-current={view === id ? 'page' : undefined}
              onClick={() => setView(id)}
            >
              {label}
              {count ? <span className="nav-count">{count}</span> : null}
            </button>
          ))}
        </nav>
        <div className="side-foot">
          <p>WhatsApp, Instagram, LinkedIn, and Facebook.</p>
          <button type="button" className="linkish" onClick={onReset}>Reset this walkthrough</button>
        </div>
      </aside>
      <main className="main">
        {view === 'today' && (
          <Today
            log={log}
            plan={plan}
            onToday={onToday}
            evening={evening}
            nextLead={nextLead}
            enquiries={enquiries}
            checked={checked}
            onApprove={approve}
            onOpenProperty={openProperty}
            onOpenLead={openLead}
            onOpenPosts={() => setView('posts')}
          />
        )}
        {view === 'groups' && <Groups onOpenProperty={openProperty} />}
        {view === 'properties' && (
          <Properties
            focusId={focusId}
            checked={checked}
            run={run}
            onFocus={setFocusId}
            onRun={runCheck}
            onOpenFlyers={() => setView('flyers')}
            onOpenPosts={() => setView('posts')}
            onCopy={(text) => copyText(text, setToast)}
          />
        )}
        {view === 'flyers' && (
          <Flyers
            focusId={focusId}
            checked={checked}
            plan={plan}
            onFocus={setFocusId}
            onQueue={queueVersion}
            onOpenPosts={() => setView('posts')}
          />
        )}
        {view === 'posts' && (
          <Posts
            focusId={focusId}
            checked={checked}
            plan={plan}
            onFocus={setFocusId}
            onApprove={approve}
            onRemove={removeFromPlan}
            onQueue={queueVersion}
            onCopy={(text) => copyText(text, setToast)}
          />
        )}
        {view === 'leads' && (
          <LeadsView
            leads={leads}
            leadId={leadId}
            drafts={drafts}
            onFocus={setLeadId}
            onDraft={(id, value) => setDrafts((prev) => ({ ...prev, [id]: value }))}
            onSend={sendLead}
            onOpenProperty={openProperty}
          />
        )}
        {view === 'messages' && (
          <Messages
            threads={threads}
            threadId={threadId}
            replies={replies}
            onFocus={setThreadId}
            onReply={(id, value) => setReplies((prev) => ({ ...prev, [id]: value }))}
            onSend={sendReply}
          />
        )}
      </main>
      {toast ? <div className="toast" role="status">{toast}</div> : null}
    </div>
  )
}

function Today({ log, plan, onToday, evening, nextLead, enquiries, checked, onApprove, onOpenProperty, onOpenLead, onOpenPosts }) {
  return (
    <>
      <p className="kicker">Thursday, 8 October</p>
      <h1 className="lede">Three listings came out of the groups. One should not go out.</h1>
      <p className="sub">
        {nextLead?.id === 'meena' ? 'Meena from BNI has waited six days.' : 'Answered leads drop down the list.'}
        {' '}
        {evening?.status === 'draft' ? 'The evening post is still open.' : 'Both posts for today are set.'}
        {' '}
        The 9:00 am Instagram post has already brought new buyers.
      </p>
      <div className="today-grid">
        <div>
          <div className="decisions">
            <button type="button" className="decision" onClick={() => onOpenProperty('oragadam')}>
              <h2>Hold the Oragadam plot</h2>
              <p>A 2019 mortgage is still on the certificate. The patta name does not match the person who posted it.</p>
              <span className="go">Open the check</span>
            </button>
            {nextLead && (
              <button type="button" className="decision" onClick={() => onOpenLead(nextLead.id)}>
                <h2>Write to {nextLead.name}</h2>
                <p>{nextLead.source}. {nextLead.age} {nextLead.about}.</p>
                <span className="go">Open the draft</span>
              </button>
            )}
            {evening?.status === 'draft' ? (
              <button type="button" className="decision" onClick={() => onApprove(evening.id)}>
                <h2>Evening post, 7:30 pm</h2>
                <p>Anna Nagar on LinkedIn. The size is corrected to 1,420 sq ft.</p>
                <span className="go">Approve</span>
              </button>
            ) : (
              <button type="button" className="decision" onClick={onOpenPosts}>
                <h2>{evening ? 'Evening post is queued' : 'The 7:30 pm slot is open'}</h2>
                <p>{evening ? `${propertyById(evening.propertyId).short} on ${evening.platform}.` : 'Two posts a day. Morning is already out.'}</p>
                <span className="go">Open posts</span>
              </button>
            )}
          </div>
          {!checked.ecr && (
            <p className="quiet-link">
              The ECR villa has no check yet.{' '}
              <button type="button" onClick={() => onOpenProperty('ecr')}>Run it</button>
            </p>
          )}
        </div>
        <div>
          <section className="panel">
            <p className="kicker">{onToday} of 2 today</p>
            <h2>Posts</h2>
            {plan.filter((entry) => entry.day === 'today').map((entry) => (
              <button type="button" className="slot" key={entry.id} onClick={onOpenPosts}>
                <time>{entry.time}</time>
                <span>{propertyById(entry.propertyId).short}, {entry.platform}</span>
                <em className={`tag ${entry.status}`}>{entry.status === 'posted' ? 'Posted' : entry.status === 'queued' ? 'Queued' : 'Draft'}</em>
              </button>
            ))}
            {plan.every((entry) => entry.day !== 'tomorrow') && (
              <p className="meta" style={{ padding: '12px 0' }}>Tomorrow is clear.</p>
            )}
          </section>
          <section className="panel">
            <p className="kicker">Lead generation</p>
            <h2>New enquiries</h2>
            {enquiries.map((lead) => (
              <button type="button" className="slot wide" key={lead.id} onClick={() => onOpenLead(lead.id)}>
                <time>{lead.source}</time>
                <span>{lead.name}</span>
                <em className={`tag ${lead.status}`}>{LEAD_LABEL[lead.status]}</em>
              </button>
            ))}
            {enquiries.length === 0 && <p className="meta" style={{ padding: '12px 0' }}>Everyone from today’s posts has been answered.</p>}
          </section>
          <section className="panel">
            <h2>What happened today</h2>
            <ul className="log">
              {log.map((item) => (
                <li key={`${item.time}-${item.text}`}>
                  <time>{item.time}</time>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  )
}

function Groups({ onOpenProperty }) {
  const kept = FEED.filter((item) => item.keep)
  const left = FEED.filter((item) => item.leave)
  return (
    <>
      <header className="page-head">
        <p className="kicker">WhatsApp groups</p>
        <h1>42 messages. 3 properties.</h1>
        <p className="sub">
          Six groups were read at 7:12 am. {GROUPS.join(', ')}. Twelve messages are on this screen. The other 30 were greetings, loan ads, and repeats.
        </p>
      </header>
      <div className="split even">
        <div>
          <p className="kicker">What the groups sent</p>
          <div className="scroller stack" style={{ marginTop: 8 }}>
            {FEED.map((item) => (
              <article
                key={item.id}
                className={`row feed-item ${item.keep ? 'kept' : item.leave ? 'leave' : 'drop'}`}
              >
                <span className="meta">{item.group}, {item.time}</span>
                <p>{item.text}</p>
                <span className={`tag ${item.keep ? 'clear' : item.leave ? 'warn' : ''}`}>
                  {item.keep ? 'Kept' : item.reason}
                </span>
              </article>
            ))}
          </div>
        </div>
        <div>
          <p className="kicker">What the agent kept</p>
          <div className="stack" style={{ marginTop: 8 }}>
            {kept.map((item) => {
              const property = propertyById(item.keep)
              return (
                <button type="button" className="card" key={item.id} onClick={() => onOpenProperty(property.id)}>
                  <span className="meta">{item.group}, {item.time}</span>
                  <strong>{property.short}</strong>
                  <span>{property.price}, {property.place}</span>
                  <span className={`tag ${property.status === 'ready' ? 'clear' : property.status === 'hold' ? 'hold' : 'warn'}`}>
                    {STATUS_WORD[property.status]}
                  </span>
                  <p>{property.summary}</p>
                </button>
              )
            })}
          </div>
          <p className="kicker" style={{ marginTop: 18 }}>Left for you</p>
          {left.map((item) => (
            <article className="card" key={item.id}>
              <span className="meta">{item.group}, {item.time}</span>
              <strong>Bank auction, Ambattur</strong>
              <p>{item.text}</p>
              <p className="meta">Auctions stay with you. They are not turned into a flyer or a post.</p>
            </article>
          ))}
        </div>
      </div>
    </>
  )
}

function Properties({ focusId, checked, run, onFocus, onRun, onOpenFlyers, onOpenPosts, onCopy }) {
  const property = propertyById(focusId)
  const mode = modeFor(property, checked)
  const result = property.id === 'ecr' && checked.ecr ? ECR_CHECK : property.check
  const running = run?.id === property.id
  const status = property.id === 'ecr' && checked.ecr ? 'hold' : property.status

  return (
    <>
      <header className="page-head">
        <p className="kicker">Properties</p>
        <h1>Check the papers before the flyer.</h1>
      </header>
      <div className="split">
        <div className="list">
          {PROPERTIES.map((item) => {
            const itemStatus = item.id === 'ecr' && checked.ecr ? 'hold' : item.status
            return (
              <button
                type="button"
                key={item.id}
                className="row"
                aria-current={item.id === focusId ? 'true' : undefined}
                onClick={() => onFocus(item.id)}
              >
                <strong>{item.short}</strong>
                <span className="meta">{item.price}</span>
                <span className={`tag ${itemStatus === 'ready' ? 'clear' : itemStatus === 'hold' ? 'hold' : 'warn'}`}>
                  {STATUS_WORD[itemStatus]}
                </span>
              </button>
            )
          })}
        </div>
        <article className="detail">
          <p className="kicker">{property.source}</p>
          <h1>{property.short}</h1>
          <p className="sub">{property.place}. {property.summary}</p>
          {mode === 'held' && <p className="banner">{blockReason(property, checked)}</p>}
          {mode === 'blocked' && property.status === 'thin' && (
            <p className="banner warn">{blockReason(property, checked)}</p>
          )}
          {mode === 'ready' && <p className="banner ok">Ready to post. The copy uses the papers, not the group text.</p>}
          <div className="quote">
            <span>Message that came in</span>
            <p>{property.original}</p>
          </div>
          {result && property.areaAd !== property.areaDoc && (
            <p className="sub">The message says {property.areaAd}. The papers say {property.areaDoc}.</p>
          )}

          {running && (
            <ol className="steps">
              {CHECK_STEPS.map((label, index) => (
                <li key={label} className={index < run.step ? 'done' : index === run.step ? 'on' : ''}>
                  <span className="meta">{index < run.step ? 'Done' : index === run.step ? 'Working' : 'Waiting'}</span>
                  {' '}{label}
                </li>
              ))}
            </ol>
          )}

          {!running && !result && property.status !== 'thin' && (
            <div className="actions">
              <button type="button" className="btn" onClick={() => onRun(property.id)}>Run the background check</button>
            </div>
          )}

          {!running && result && (
            <>
              <p className="kicker" style={{ marginTop: 18 }}>Background check</p>
              <p className="meta">Encumbrance certificate, patta, why it has not sold, and the listing against the papers.</p>
              <div className="checks">
                {[
                  ['Encumbrance certificate', result.ec],
                  ['Patta', result.patta],
                  ['Why it has not sold', result.unsold],
                  ['Listing against the papers', result.description],
                ].map(([label, item]) => (
                  <section key={label} className={`check ${item.tone}`}>
                    <p className="kicker">{label}</p>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </section>
                ))}
              </div>
            </>
          )}

          {property.question && (
            <div className="actions" style={{ display: 'block' }}>
              <p className="kicker">Question back to the poster</p>
              <div style={{ margin: '8px 0' }}><Block text={property.question} /></div>
              <button type="button" className="btn" onClick={() => onCopy(property.question)}>Copy the question</button>
            </div>
          )}

          <div className="actions">
            <button type="button" className="btn ghost" onClick={onOpenFlyers}>Flyer</button>
            <button type="button" className="btn ghost" onClick={onOpenPosts}>Posts</button>
          </div>
          <p className="meta" style={{ marginTop: 8 }}>Status on this property: {STATUS_WORD[status]}.</p>
        </article>
      </div>
    </>
  )
}

function factsFor(property, checked) {
  if (property.id === 'ecr' && checked.ecr && property.afterFacts) return property.afterFacts
  if (property.poster && property.status === 'ready') return property.poster
  return property.facts
}

function Flyers({ focusId, checked, plan, onFocus, onQueue, onOpenPosts }) {
  const property = propertyById(focusId)
  const mode = modeFor(property, checked)
  const whatsapp = plan.find((entry) => entry.propertyId === property.id && entry.platform === 'WhatsApp')
  const instagram = plan.find((entry) => entry.propertyId === property.id && entry.platform === 'Instagram')
  return (
    <>
      <header className="page-head">
        <p className="kicker">Flyers</p>
        <h1>One frame for every property.</h1>
        <p className="sub">
          Logo, phone, and colours stay the same. Only the listing changes. A held property is marked, and it cannot be sent.
        </p>
      </header>
      <div className="flyer-layout">
        <Flyer
          property={property}
          mode={mode}
          facts={factsFor(property, checked)}
          reason={blockReason(property, checked)}
        />
        <div className="notes">
          <p>
            {mode === 'ready' && 'This one can go out. Logo, phone, and colours match the other properties.'}
            {mode === 'held' && 'You can look at it. It is marked do not circulate, and it cannot be sent.'}
            {mode === 'blocked' && blockReason(property, checked)}
          </p>
          {mode === 'ready' && (
            <div className="actions">
              {whatsapp ? (
                <button type="button" className="btn ghost" onClick={onOpenPosts}>
                  WhatsApp is on the plan
                </button>
              ) : (
                <button type="button" className="btn" onClick={() => onQueue(property.id, 'WhatsApp')}>
                  Send flyer on WhatsApp
                </button>
              )}
              {instagram ? (
                <button type="button" className="btn ghost" onClick={onOpenPosts}>
                  Instagram is on the plan
                </button>
              ) : (
                <button type="button" className="btn ghost" onClick={() => onQueue(property.id, 'Instagram')}>
                  Schedule on Instagram
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="mini-row">
        {PROPERTIES.map((item) => {
          const itemMode = modeFor(item, checked)
          return (
            <button
              type="button"
              key={item.id}
              className="mini"
              aria-current={item.id === focusId ? 'true' : undefined}
              onClick={() => onFocus(item.id)}
            >
              <span className="mini-top">
                <span className="mark">SK</span>
                <span className={`tag ${itemMode === 'ready' ? 'clear' : itemMode === 'held' ? 'hold' : 'warn'}`}>
                  {itemMode === 'ready' ? 'Share' : itemMode === 'held' ? 'Hold' : 'Wait'}
                </span>
              </span>
              <b>{item.flyerTitle}</b>
              <span className="meta">{itemMode === 'blocked' ? 'No flyer yet' : item.price}</span>
            </button>
          )
        })}
      </div>
    </>
  )
}

function Posts({ focusId, checked, plan, onFocus, onApprove, onRemove, onQueue, onCopy }) {
  const property = propertyById(focusId)
  const mode = modeFor(property, checked)
  const versions = property.id === 'ecr'
    ? (checked.ecr ? ECR_VERSIONS : null)
    : VERSIONS[property.id]

  return (
    <>
      <header className="page-head">
        <p className="kicker">Posts</p>
        <h1>Two a day. Each network gets its own words.</h1>
        <p className="sub">
          Morning at 9:00, evening at 7:30. You approve the words, and the post goes out with the flyer. He still cuts the reels.
        </p>
      </header>
      <section className="panel" style={{ marginBottom: 18 }}>
        <h2>The day</h2>
        {SLOTS.map((slot) => {
          const item = plan.find((entry) => entry.day === slot.day && entry.time === slot.time)
          const named = item ? propertyById(item.propertyId) : null
          return (
            <div className="slot" key={`${slot.day}-${slot.time}`}>
              <time>{slot.time}</time>
              <span>
                <strong>{slot.day === 'today' ? 'Today' : 'Tomorrow'}</strong>
                {named ? `, ${named.short} on ${item.platform}` : '. Open slot'}
              </span>
              <span className="slot-actions">
                {item && (
                  <em className={`tag ${item.status}`}>
                    {item.status === 'posted' ? 'Posted' : item.status === 'queued' ? 'Queued' : 'Draft'}
                  </em>
                )}
                {item?.status === 'draft' && (
                  <button type="button" className="btn" onClick={() => onApprove(item.id)}>Approve</button>
                )}
                {item && item.status !== 'posted' && (
                  <button type="button" className="btn ghost" onClick={() => onRemove(item.id)}>Take off the day</button>
                )}
              </span>
            </div>
          )
        })}
      </section>
      <div className="picker" role="tablist" aria-label="Properties">
        {PROPERTIES.map((item) => (
          <button
            type="button"
            key={item.id}
            aria-current={item.id === focusId ? 'true' : undefined}
            onClick={() => onFocus(item.id)}
          >
            {item.short}
          </button>
        ))}
      </div>
      {!versions && (
        <p className="banner warn">{blockReason(property, checked)}</p>
      )}
      {property.question && !versions && (
        <div className="actions">
          <button type="button" className="btn" onClick={() => onCopy(property.question)}>Copy the question to the poster</button>
        </div>
      )}
      {versions && (
        <div className="versions">
          {PLATFORMS.map((platform) => {
            const version = versions[platform]
            return (
              <article className="version" key={platform}>
                <header>
                  <h3>{platform}</h3>
                  <span className="meta">{PLATFORM_NOTE[platform]}</span>
                </header>
                {version.reel && <p className="reel">{version.reel}</p>}
                <Block text={version.text} />
                {mode === 'ready' && <p className="meta">The flyer goes with this post.</p>}
                <div className="actions">
                  <button
                    type="button"
                    className="btn"
                    disabled={mode !== 'ready'}
                    onClick={() => onQueue(property.id, platform)}
                  >
                    {mode === 'ready' ? 'Queue this' : 'Not queued'}
                  </button>
                  <button type="button" className="btn ghost" onClick={() => onCopy(version.text)}>Copy</button>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </>
  )
}

function LeadsView({ leads, leadId, drafts, onFocus, onDraft, onSend, onOpenProperty }) {
  const ordered = [...leads].sort((a, b) => LEAD_RANK[a.status] - LEAD_RANK[b.status])
  const lead = leads.find((item) => item.id === leadId) || ordered[0]
  const draft = drafts[lead.id] ?? lead.draft
  return (
    <>
      <header className="page-head">
        <p className="kicker">Leads</p>
        <h1>BNI referrals do not wait behind new enquiries.</h1>
        <p className="sub">
          Posts, 99acres, campaigns, and BNI all land here. Meena asked on Tuesday. She stays at the top until someone writes to her.
        </p>
      </header>
      <div className="split">
        <div className="list">
          {ordered.map((item) => (
            <button
              type="button"
              key={item.id}
              className="row"
              aria-current={item.id === lead.id ? 'true' : undefined}
              onClick={() => onFocus(item.id)}
            >
              <strong>{item.name}</strong>
              <span className="meta">{item.source}</span>
              <span className={`tag ${item.status}`}>{LEAD_LABEL[item.status]}</span>
            </button>
          ))}
        </div>
        <article>
          <p className="kicker">{lead.source}</p>
          <h1 style={{ fontSize: 36 }}>{lead.name}</h1>
          <p className="sub">{lead.age} {lead.about}.</p>
          {lead.status !== 'sent' && lead.origin && <p className="sub">{lead.origin}</p>}
          {lead.status !== 'sent' && <p className="sub">{lead.note}</p>}
          {lead.propertyId && (
            <div className="actions">
              <button type="button" className="btn ghost" onClick={() => onOpenProperty(lead.propertyId)}>Open the property</button>
            </div>
          )}
          {lead.draft && lead.status !== 'sent' && (
            <>
              <p className="kicker" style={{ marginTop: 16 }}>Draft</p>
              <textarea
                value={draft}
                aria-label={`Draft to ${lead.name}`}
                onChange={(event) => onDraft(lead.id, event.target.value)}
              />
              <div className="actions">
                <button type="button" className="btn" onClick={() => onSend(lead.id)}>Send follow-up</button>
              </div>
            </>
          )}
          {lead.status === 'sent' && <p className="banner ok">Follow-up sent.</p>}
        </article>
      </div>
    </>
  )
}

function Messages({ threads, threadId, replies, onFocus, onReply, onSend }) {
  const thread = threads.find((item) => item.id === threadId) || threads[0]
  const sent = thread.messages.some((message) => message.from === 'me')
  const draft = replies[thread.id] ?? thread.suggestion
  return (
    <>
      <header className="page-head">
        <p className="kicker">Messages</p>
        <h1>Replies for WhatsApp, Instagram, Facebook, and LinkedIn.</h1>
        <p className="sub">Each reply is drafted from the property papers. You send it. A buyer from a post stays on the lead list.</p>
      </header>
      <div className="split">
        <div className="list">
          {threads.map((item) => (
            <button
              type="button"
              key={item.id}
              className="row"
              aria-current={item.id === thread.id ? 'true' : undefined}
              onClick={() => onFocus(item.id)}
            >
              <strong>{item.name}</strong>
              <span className="meta">{item.channel}, {item.when}</span>
              {item.unread && <span className="tag new">Unread</span>}
            </button>
          ))}
        </div>
        <article className="thread">
          <p className="kicker">{thread.channel}</p>
          <h1 style={{ fontSize: 36 }}>{thread.name}</h1>
          {thread.messages.map((message) => (
            <div key={message.text} className={`bubble ${message.from === 'me' ? 'mine' : ''}`}>
              <Block text={message.text} />
            </div>
          ))}
          {!sent && (
            <>
              <p className="kicker">Suggested reply</p>
              <textarea
                value={draft}
                aria-label={`Reply to ${thread.name}`}
                onChange={(event) => onReply(thread.id, event.target.value)}
              />
              <div className="actions">
                <button type="button" className="btn" onClick={() => onSend(thread.id)}>Send reply</button>
              </div>
            </>
          )}
          {sent && (
            <p className="banner ok">
              Reply sent on {thread.channel}.
              {thread.leadId ? ` ${thread.name} is on the lead list.` : ''}
            </p>
          )}
        </article>
      </div>
    </>
  )
}

export default App
