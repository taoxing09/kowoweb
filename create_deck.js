const pptxgen = require('pptxgenjs');
const { warnIfSlideHasOverlaps, warnIfSlideElementsOutOfBounds } = require('/home/oai/skills/slides/pptxgenjs_helpers');
const path = require('path');

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'KOWO';
pptx.company = 'KOWO SARL';
pptx.subject = 'Payment Infrastructure Requirements';
pptx.title = 'KOWO Payment Infrastructure Requirements';
pptx.lang = 'fr-FR';
pptx.theme = {
  headFontFace: 'Jost',
  bodyFontFace: 'Jost',
  lang: 'fr-FR'
};
pptx.defineLayout({ name: 'CUSTOM_WIDE', width: 13.333, height: 7.5 });
pptx.layout = 'CUSTOM_WIDE';
pptx.margin = 0;

const C = {
  green: '123B2B', green2:'1C563E', mint:'8DFFD3', gold:'FFC323', cream:'F6F1E7', paper:'FFFDF8', ink:'0E1712', muted:'68766E', line:'DFD8CB', danger:'B42318', white:'FFFFFF', black:'07150F'
};
const logo = path.resolve('/mnt/data/kowo-payment-infrastructure-pack/assets/kowo-logo-official.jpeg');
const W=13.333,H=7.5;

function addBg(slide, color=C.cream){ slide.background = { color }; }
function addLogo(slide, x=.55, y=.38, s=.38, dark=false){
  slide.addImage({ path: logo, x, y, w:s, h:s });
  slide.addText([{text:'KO',options:{color:dark?C.white:C.green,bold:true}},{text:'WO',options:{color:C.gold,bold:true}}], { x:x+s+.12, y:y+.06, w:1.2, h:.28, fontFace:'Jost', fontSize:14, margin:0, breakLine:false });
}
function footer(slide, n, dark=false){
  slide.addText('Payment Infrastructure Requirements', {x:.55, y:7.05, w:3.7, h:.2, fontSize:8.5, color:dark?'A9B8AE':C.muted, margin:0});
  slide.addText(String(n).padStart(2,'0'), {x:12.35, y:7.05, w:.45, h:.2, fontSize:8.5, color:dark?'A9B8AE':C.muted, margin:0, align:'right'});
}
function title(slide, kicker, t, sub, dark=false){
  slide.addText(kicker.toUpperCase(), {x:.72,y:.86,w:3.2,h:.18,fontSize:8.5,bold:true,color:C.gold,charSpace:1.2,margin:0});
  slide.addText(t, {x:.7,y:1.12,w:5.9,h:.78,fontSize:26,bold:true,color:dark?C.white:C.ink,margin:0,fit:'shrink'});
  // subtitle intentionally omitted for clean slide layout
}
function chip(slide, text, x,y,w, fill=C.paper, color=C.green){ slide.addShape(pptx.ShapeType.roundRect,{x,y,w,h:.34,rectRadius:.12,fill:{color:fill},line:{color:'FFFFFF',transparency:100}}); slide.addText(text,{x:x+.12,y:y+.09,w:w-.24,h:.15,fontSize:8.5,bold:true,color,margin:0,align:'center'});}
function card(slide, x,y,w,h, heading, body, options={}){
  const fill = options.fill || C.paper, line = options.line || C.line;
  slide.addShape(pptx.ShapeType.roundRect,{x,y,w,h,rectRadius:.16,fill:{color:fill},line:{color:line,transparency:options.lineTrans||0,pt:1}});
  if(options.bar) slide.addShape(pptx.ShapeType.rect,{x,y,w:.06,h,fill:{color:options.bar},line:{color:options.bar,transparency:100}});
  slide.addText(heading,{x:x+.28,y:y+.22,w:w-.56,h:.28,fontSize:14,bold:true,color:options.dark?C.white:C.ink,margin:0,fit:'shrink'});
  slide.addText(body,{x:x+.28,y:y+.62,w:w-.56,h:h-.82,fontSize:10.5,color:options.dark?'CAD7CF':C.muted,margin:0,fit:'shrink',breakLine:false});
}
function addArrow(slide, x1,y1,x2,y2, color=C.gold){slide.addShape(pptx.ShapeType.line,{x:x1,y:y1,w:x2-x1,h:y2-y1,line:{color,pt:1.4,beginArrowType:'none',endArrowType:'triangle'}})}
function pillar(slide,x,y,w,h,icon,heading,body,fill=C.paper){
  slide.addShape(pptx.ShapeType.roundRect,{x,y,w,h,rectRadius:.18,fill:{color:fill},line:{color:C.line,pt:1}});
  slide.addText(icon,{x:x+.22,y:y+.2,w:.42,h:.32,fontSize:20,margin:0});
  slide.addText(heading,{x:x+.75,y:y+.25,w:w-.95,h:.25,fontSize:13,bold:true,color:C.ink,margin:0,fit:'shrink'});
  slide.addText(body,{x:x+.25,y:y+.72,w:w-.5,h:h-.9,fontSize:9.6,color:C.muted,margin:0,fit:'shrink'});
}

const slides = [];
function newSlide(bg=C.cream){ const s=pptx.addSlide(); addBg(s,bg); slides.push(s); return s; }

// 1 Cover
{ const s=newSlide(C.green); 
  s.addShape(pptx.ShapeType.arc,{x:8.7,y:.15,w:3.9,h:3.9,adjustPoint:.3,line:{color:C.mint,transparency:85,pt:1.2},fill:{color:C.mint,transparency:92}});

  addLogo(s,.74,.62,.55,true);
  s.addText('PAYMENT\nINFRASTRUCTURE\nREQUIREMENTS',{x:.78,y:1.92,w:6.7,h:2.2,fontSize:44,bold:true,color:C.white,margin:0,breakLine:false,fit:'shrink'});
  s.addText('Wallet-based payment model for community finance, user fund segregation and platform commission settlement.',{x:.82,y:4.45,w:6.1,h:.58,fontSize:15,color:'CFE6DA',margin:0,fit:'shrink'});
  chip(s,'Version 1.0',.82,5.3,1.2,'214F39',C.mint); chip(s,'Partner-facing',2.14,5.3,1.42,'214F39',C.mint); chip(s,'Confidential',3.68,5.3,1.28,'214F39',C.mint);
  s.addText('KOWO SARL · getkowo.com · contact@getkowo.com',{x:.82,y:6.95,w:6,h:.2,fontSize:9,color:'A9B8AE',margin:0});
}

// 2 Ask
{ const s=newSlide(); addLogo(s); title(s,'01 · Executive ask','What KOWO needs from a payment partner','A wallet infrastructure where user funds stay segregated and KOWO receives only its platform commission.');
  card(s,6.75,.85,5.78,1.08,'Core request','Provide wallet or ledger capabilities per user, with partner-controlled payment flows, automated commission split and auditable transaction records.',{bar:C.green});
  pillar(s,6.75,2.25,1.8,2.0,'👤','User wallets','Each user has an individual wallet/account or segregated balance.');
  pillar(s,8.75,2.25,1.8,2.0,'🔒','Locked balance','Caution/deposit can be held by the regulated partner, not KOWO.');
  pillar(s,10.75,2.25,1.8,2.0,'％','Fee split','KOWO commission is collected automatically and separately.');
  pillar(s,6.75,4.55,1.8,1.75,'📄','Traceability','Ledger, webhooks, reconciliation and audit exports.');
  pillar(s,8.75,4.55,1.8,1.75,'🛡️','Compliance','KYC/AML rules aligned with partner obligations.');
  pillar(s,10.75,4.55,1.8,1.75,'⚙️','API-first','Clear APIs for funding, holds, payouts and events.');
  footer(s,2);
}

// 3 Principle
{ const s=newSlide(C.green); addLogo(s,.55,.38,.38,true); title(s,'02 · Guiding principle','No commingling of user funds','The desired architecture avoids user funds transiting through KOWO’s operational balance. KOWO receives only platform fees.','dark');
  card(s,.75,3.3,3.6,1.2,'Rejected model','All contributions arrive on a single KOWO merchant account, then KOWO redistributes later.',{fill:'1C563E',line:'2C7655',dark:true,bar:C.danger});
  card(s,4.85,3.3,3.6,1.2,'Target model','Funds are maintained in user wallets/segregated balances managed by the regulated partner.',{fill:'1C563E',line:'2C7655',dark:true,bar:C.mint});
  card(s,8.95,3.3,3.6,1.2,'Platform revenue','KOWO commission is automatically deducted and settled to KOWO’s wallet/account.',{fill:'1C563E',line:'2C7655',dark:true,bar:C.gold});
  s.addText('Design objective: make the financial flow understandable before it becomes large.',{x:.76,y:6.25,w:7,h:.32,fontSize:18,bold:true,color:C.white,margin:0});
  footer(s,3,true);
}

// 4 User wallets diagram
{ const s=newSlide(); addLogo(s); title(s,'03 · Target wallet model','Segregated user balances with platform commission','The partner should support individual wallets or ledger accounts with clear ownership, balance tracking and settlement rules.');
  // edges first
  addArrow(s,2.4,3.2,4.05,3.2); addArrow(s,5.1,3.2,6.75,3.2); addArrow(s,7.85,3.2,9.5,3.2); addArrow(s,9.95,4.05,9.95,5.1,C.green); addArrow(s,7.1,4.05,5.3,5.1,C.gold);
  card(s,.85,2.42,1.5,1.55,'User A','Wallet A\nPartner-managed',{fill:'F2F7F4'});
  card(s,2.85,2.42,1.5,1.55,'User B','Wallet B\nPartner-managed',{fill:'F2F7F4'});
  card(s,4.85,2.42,1.5,1.55,'User C','Wallet C\nPartner-managed',{fill:'F2F7F4'});
  card(s,6.85,2.42,1.55,1.55,'Group rules','Contribution schedule\nRotation order',{fill:'FFF8E1',bar:C.gold});
  card(s,9.0,2.42,2.05,1.55,'Beneficiary','Payout executed by partner',{fill:'F2F7F4',bar:C.green});
  card(s,8.95,5.05,2.0,1.0,'KOWO','Commission only',{fill:'FFF8E1',bar:C.gold});
  s.addText('KOWO orchestrates rules and UX. The regulated partner holds, moves and records the funds.',{x:.85,y:6.35,w:10.5,h:.26,fontSize:12.5,color:C.muted,margin:0});
  footer(s,4);
}

// 5 Use cases
{ const s=newSlide(); addLogo(s); title(s,'04 · Supported use cases','The model must cover KOWO’s current and near-term product','The partner infrastructure should handle community savings, project contributions, donations and future partner-led investment access.');
  const items=[['Épargne collective','Recurring contributions and rotation payouts.'],['Caution / guarantee hold','Amount locked temporarily to reduce default risk.'],['Community projects','Contributions towards a project milestone or beneficiary.'],['Donations','Diaspora or local support flows towards a project/person.'],['Platform fees','Automatic commission split to KOWO.'],['Partner-led investment','Future access through regulated SGI/banks only.']];
  items.forEach((it,i)=>{const x=.8+(i%3)*4.05,y=2.05+Math.floor(i/3)*1.65; card(s,x,y,3.45,1.25,it[0],it[1],{fill:i%2?'FFF8E1':'F2F7F4',bar:i%2?C.gold:C.green});});
  footer(s,5);
}

// 6 Funding
{ const s=newSlide(C.green); addLogo(s,.55,.38,.38,true); title(s,'05 · Funding requirements','Users must fund their own wallet or balance','KOWO should not receive bulk user funds on an operational merchant account.','dark');
  const y=3.1;
  card(s,.8,y,2.0,1.1,'1. User pays','Mobile Money, card or bank transfer.',{fill:'1C563E',line:'2C7655',dark:true});
  addArrow(s,2.95,y+.55,3.75,y+.55);
  card(s,3.8,y,2.0,1.1,'2. Partner records','Funds credited to user wallet/balance.',{fill:'1C563E',line:'2C7655',dark:true});
  addArrow(s,5.95,y+.55,6.75,y+.55);
  card(s,6.8,y,2.05,1.1,'3. KOWO notified','Webhook updates contribution status.',{fill:'1C563E',line:'2C7655',dark:true});
  addArrow(s,9.0,y+.55,9.8,y+.55);
  card(s,9.85,y,2.2,1.1,'4. Ledger visible','User sees transaction history in app.',{fill:'1C563E',line:'2C7655',dark:true});
  s.addText('Required: unique payment references, real-time or near real-time status updates, reversible failed payments and audit trail.',{x:.85,y:5.55,w:10.7,h:.46,fontSize:15,color:'DCEBE4',margin:0,fit:'shrink'});
  footer(s,6,true);
}

// 7 Locked caution
{ const s=newSlide(); addLogo(s); title(s,'06 · Caution / guarantee hold','Temporary locked balance managed by the partner','KOWO’s product may require a blocked caution to reduce default risk. This hold should be reflected in a user balance controlled by the partner.');
  const steps=[['Create hold','KOWO requests partner to lock a defined amount.'],['Show status','App displays available vs locked balance.'],['Release or use','Partner releases or allocates according to predefined rules.'],['Record outcome','Full event trail for users and support.']];
  steps.forEach((st,i)=>{ const x=1.0+i*3.0; card(s,x,2.8,2.45,1.45,st[0],st[1],{fill:i===0?'FFF8E1':'F2F7F4',bar:i%2?C.green:C.gold}); if(i<3) addArrow(s,x+2.5,3.52,x+2.9,3.52); });
  s.addText('Important wording: this is a “locked balance / guarantee hold” managed by the payment partner, not a KOWO deposit account.',{x:1.0,y:5.55,w:10.5,h:.42,fontSize:13.5,bold:true,color:C.green,margin:0});
  footer(s,7);
}

// 8 Commission
{ const s=newSlide(); addLogo(s); title(s,'07 · Commission split','KOWO receives only its fee, not user funds','The infrastructure must support automatic commission calculation and settlement without manual redistribution by KOWO.');
  card(s,.85,2.25,3.2,1.2,'Tontines / savings','Target commission: 1% of eligible contribution amount.',{fill:'F2F7F4',bar:C.green});
  card(s,5.05,2.25,3.2,1.2,'Clubs / advanced modules','Target commission: 3% where applicable, subject to final model.',{fill:'FFF8E1',bar:C.gold});
  card(s,9.25,2.25,3.2,1.2,'Future products','Fees only when partner-led and contractually approved.',{fill:'F2F7F4',bar:C.green});
  card(s,2.1,4.25,9.0,1.25,'Required settlement logic','Partner debits the user contribution, routes the principal to the beneficiary / group process and settles KOWO’s fee separately to KOWO’s wallet/account with invoice-ready reporting.',{fill:C.green,line:C.green,dark:true,bar:C.gold});
  footer(s,8);
}

// 9 Payouts
{ const s=newSlide(C.cream); addLogo(s); title(s,'08 · Payout requirements','Rules-based payout execution','The partner should execute payouts according to rules accepted by users and confirmed by KOWO’s application workflow.');
  const rows=[['Rotation payout','Pay the beneficiary scheduled for the current cycle.'],['Project payout','Pay the project owner/beneficiary when conditions are met.'],['Refund','Return funds to the originating user when rules require it.'],['Failed payout','Return a clear failure code and status for user support.']];
  rows.forEach((r,i)=>{card(s,.9,2.0+i*1.05,11.3,.78,r[0],r[1],{fill:i%2?'FFFFFF':'F2F7F4',bar:i%2?C.gold:C.green});});
  footer(s,9);
}

// 10 KYC
{ const s=newSlide(); addLogo(s); title(s,'09 · KYC / identity requirements','KYC must be compatible with partner compliance rules','KOWO currently plans Sumsub for identity verification. The partner may also require its own KYC workflow or validation.');
  pillar(s,.85,2.25,2.7,2.1,'🪪','Identity verification','KYC status available via API or integrated workflow.');
  pillar(s,3.85,2.25,2.7,2.1,'🧭','Risk-based levels','Limits by KYC level, country, transaction volume and use case.');
  pillar(s,6.85,2.25,2.7,2.1,'🧾','Document evidence','Verification reports retained and accessible according to policy.');
  pillar(s,9.85,2.25,2.7,2.1,'🚫','Sanctions & PEP','Partner requirements for sanctions, PEP and AML screening.');
  card(s,1.45,5.1,10.5,.85,'Requirement','Clarify who performs each control: KOWO, Sumsub, the PSP, mobile money operator and banks. Avoid duplicate friction while remaining compliant.',{fill:C.green,line:C.green,dark:true,bar:C.gold});
  footer(s,10);
}

// 11 API
{ const s=newSlide(C.green); addLogo(s,.55,.38,.38,true); title(s,'10 · API capabilities','The API must support wallet-grade operations','A simple checkout API is not enough for KOWO. We need programmable balances, events, holds and split settlement.','dark');
  const api=[['Create user wallet','Onboard verified users with unique references.'],['Fund wallet','Mobile Money/card/bank funding with status callbacks.'],['Lock balance','Create, update and release caution holds.'],['Initiate payout','Partner executes payouts to eligible beneficiaries.'],['Split commission','Separate KOWO fee from user principal.'],['Export ledger','Transactions, balances, statuses and reconciliation.']];
  api.forEach((a,i)=>{const x=.85+(i%3)*4.1,y=2.25+Math.floor(i/3)*1.6; card(s,x,y,3.45,1.2,a[0],a[1],{fill:'1C563E',line:'2C7655',dark:true,bar:i%2?C.gold:C.mint});});
  footer(s,11,true);
}

// 12 Webhooks
{ const s=newSlide(); addLogo(s); title(s,'11 · Events & webhooks','KOWO requires reliable transaction states','Every payment, hold, release, payout and refund must generate clear events for user experience, support and reconciliation.');
  const events=['payment.created','payment.succeeded','payment.failed','wallet.credited','hold.created','hold.released','payout.pending','payout.succeeded','payout.failed','commission.settled'];
  events.forEach((e,i)=>{const x=.9+(i%5)*2.42,y=2.4+Math.floor(i/5)*.72; chip(s,e,x,y,2.05,i%2?'FFF8E1':'F2F7F4',i%2?C.gold:C.green);});
  card(s,1.1,5.0,10.8,1.05,'Required behavior','Events must be idempotent, signed, timestamped, retryable and mapped to human-readable statuses in the KOWO app.',{fill:C.green,line:C.green,dark:true,bar:C.gold});
  footer(s,12);
}

// 13 Reconciliation
{ const s=newSlide(); addLogo(s); title(s,'12 · Reconciliation & reporting','Operational trust depends on clean reporting','KOWO needs to reconcile every user-facing operation against partner-side balances, fees and settlement reports.');
  const cols=[['Daily ledger','Complete transaction export with references.'],['Balance report','Available, locked and settled balances.'],['Fee report','KOWO commissions by group, user and date.'],['Exception report','Failures, reversals, pending flows and disputes.']];
  cols.forEach((c,i)=>pillar(s,1.0+i*3.0,2.45,2.5,2.0,'📊',c[0],c[1]));
  card(s,1.25,5.4,10.2,.75,'Minimum standard','CSV export + API endpoint + dashboard view + settlement statement.',{fill:'FFF8E1',bar:C.gold});
  footer(s,13);
}

// 14 Risk controls
{ const s=newSlide(C.green); addLogo(s,.55,.38,.38,true); title(s,'13 · Risk controls','Controls expected before scale','KOWO will implement product-level rules. The partner should provide payment-level limits, monitoring and exception handling.','dark');
  const risks=[['Limits','Per user / group / day / month.'],['Velocity checks','Detect unusual contribution frequency.'],['Blacklists','Blocked users, numbers and beneficiaries.'],['Dispute process','Clear handling for contested payments.'],['Manual review','Partner escalation path for high-risk flows.'],['Suspension policy','Rules before freezing wallets or funds.']];
  risks.forEach((r,i)=>{const x=.85+(i%3)*4.1,y=2.3+Math.floor(i/3)*1.5; card(s,x,y,3.45,1.08,r[0],r[1],{fill:'1C563E',line:'2C7655',dark:true,bar:i%2?C.gold:C.mint});});
  footer(s,14,true);
}

// 15 UX
{ const s=newSlide(); addLogo(s); title(s,'14 · User experience requirements','Payment UX must be transparent for every participant','Because KOWO is built on trust, users must understand what is paid, locked, pending, failed and settled.');
  pillar(s,.85,2.3,2.75,2.25,'🟢','Status clarity','Paid, pending, failed, locked and released states.');
  pillar(s,3.9,2.3,2.75,2.25,'🔔','Notifications','Payment confirmations, reminders and failed action alerts.');
  pillar(s,6.95,2.3,2.75,2.25,'📜','History','Readable ledger for every user and group admin.');
  pillar(s,10.0,2.3,2.75,2.25,'🧾','Receipts','Receipts with PSP references and support IDs.');
  footer(s,15);
}

// 16 Compliance commitments
{ const s=newSlide(); addLogo(s); title(s,'15 · KOWO commitments','KOWO will not operate as a payment institution','The platform positioning must be contractually aligned with the partner to avoid ambiguity later.');
  const yes=[['KOWO does','Provide software, UX, group rules and notifications.'],['KOWO does','Display partner-side payment statuses and history.'],['KOWO does','Collect only platform fees via partner settlement.']];
  const no=[['KOWO does not','Hold user funds on its own operational balance.'],['KOWO does not','Issue e-money, provide banking services or act as a PSP.'],['KOWO does not','Promise investment returns or execute regulated investment services.']];
  yes.forEach((a,i)=>card(s,.85,2.0+i*1.12,5.7,.82,a[0],a[1],{fill:'F2F7F4',bar:C.green}));
  no.forEach((a,i)=>card(s,6.85,2.0+i*1.12,5.7,.82,a[0],a[1],{fill:'FFF3F0',bar:C.danger}));
  footer(s,16);
}

// 17 Non-goals
{ const s=newSlide(C.green); addLogo(s,.55,.38,.38,true); title(s,'16 · Non-goals','Architectures KOWO wants to avoid','These models create compliance ambiguity and operational risk as volume grows.','dark');
  card(s,1.0,2.3,3.3,2.0,'Single merchant balance','All user contributions landing on one KOWO merchant account before redistribution.',{fill:'1C563E',line:'2C7655',dark:true,bar:C.danger});
  card(s,5.0,2.3,3.3,2.0,'Manual payout operations','KOWO manually deciding and executing payouts outside a partner-controlled workflow.',{fill:'1C563E',line:'2C7655',dark:true,bar:C.danger});
  card(s,9.0,2.3,3.3,2.0,'Opaque fund status','Users cannot clearly see whether funds are paid, locked, pending or released.',{fill:'1C563E',line:'2C7655',dark:true,bar:C.danger});
  s.addText('KOWO is looking for a partner that can grow with the platform, not only process card/Mobile Money checkout.',{x:1.0,y:5.55,w:10.6,h:.4,fontSize:16,bold:true,color:C.white,margin:0});
  footer(s,17,true);
}

// 18 Assessment criteria
{ const s=newSlide(); addLogo(s); title(s,'17 · Partner assessment criteria','How KOWO will evaluate payment partners','The right partner should be able to support the operational, compliance and product model from the start.');
  const crit=[['Regulatory fit','Ability to support platform model with user wallets or segregated balances.'],['Wallet features','Individual balances, locked amounts, split fees and payouts.'],['API maturity','Reliable docs, sandbox, webhooks and idempotency.'],['Risk process','Clear policy for reviews, suspensions and fund freezes.'],['Geographic coverage','Bénin first, then UEMOA / Africa / diaspora corridors.'],['Commercial model','Transparent fees that preserve KOWO’s user economics.']];
  crit.forEach((a,i)=>{const x=.85+(i%2)*6.0,y=1.95+Math.floor(i/2)*1.27; card(s,x,y,5.3,.92,a[0],a[1],{fill:i%2?'FFF8E1':'F2F7F4',bar:i%2?C.gold:C.green});});
  footer(s,18);
}

// 19 Questions
{ const s=newSlide(); addLogo(s); title(s,'18 · Questions for prospective partners','Qualification questions before integration','These questions should be answered before KOWO commits to an integration.');
  const qs=['Can you create or map one wallet/balance per KOWO user?','Can you lock a caution/guarantee amount at user level?','Can your system automatically split platform commission?','Can payouts be executed to the scheduled beneficiary according to app rules?','What conditions trigger account suspension or fund freezing?','Who performs KYC/AML checks and what are the limits per user?','Can you provide exportable ledger and reconciliation reports?','Can you validate this model contractually before launch?'];
  qs.forEach((q,i)=>{const x=.9+(i%2)*6.0,y=1.9+Math.floor(i/2)*.92; s.addText(`${i+1}. ${q}`,{x,y,w:5.3,h:.45,fontSize:12,color:C.ink,margin:0,fit:'shrink'});});
  footer(s,19);
}

// 20 Implementation phases
{ const s=newSlide(); addLogo(s); title(s,'19 · Implementation phases','From sandbox to controlled launch','KOWO prefers a controlled rollout with clear limits before public scale.');
  const phases=[['Phase 1','Sandbox','API tests, wallet mapping, webhooks.'],['Phase 2','Pilot','Limited users, low limits, manual monitoring.'],['Phase 3','Launch','Mobile Money/card funding, automated fees, reporting.'],['Phase 4','Scale','Higher limits, expanded coverage, partner review cadence.']];
  phases.forEach((p,i)=>{const x=.9+i*3.05; card(s,x,2.6,2.55,2.0,p[0],`${p[1]}\n${p[2]}`,{fill:i%2?'FFF8E1':'F2F7F4',bar:i%2?C.gold:C.green}); if(i<3)addArrow(s,x+2.6,3.6,x+2.95,3.6);});
  footer(s,20);
}

// 21 Data/infrastructure alignment
{ const s=newSlide(); addLogo(s); title(s,'20 · Infrastructure alignment','How payment data connects with KOWO','The partner integration must align with KOWO’s existing infrastructure and compliance stack.');
  const stack=[['KOWO app','Mobile experience and group rules.'],['Render','Backend API and orchestration logic.'],['Supabase','Application database and user data.'],['Sumsub','KYC verification workflow.'],['Twilio','OTP and messaging flows.'],['Payment partner','Wallets, payment execution and ledger.']];
  stack.forEach((a,i)=>{const x=.85+(i%3)*4.1,y=2.25+Math.floor(i/3)*1.45; card(s,x,y,3.45,1.05,a[0],a[1],{fill:i===5?'FFF8E1':'FFFFFF',bar:i===5?C.gold:C.green});});
  footer(s,21);
}

// 22 Contact
{ const s=newSlide(C.green); addLogo(s,.75,.62,.55,true);
  s.addText('Let’s build a compliant wallet infrastructure for community finance.',{x:.82,y:1.85,w:7.3,h:1.45,fontSize:36,bold:true,color:C.white,margin:0,fit:'shrink'});
  s.addText('KOWO is seeking a long-term payment infrastructure partner capable of supporting user-level wallets, locked balances, automated commission splits and transparent reconciliation.',{x:.86,y:3.62,w:6.1,h:.82,fontSize:15,color:'DCEBE4',margin:0,fit:'shrink'});
  card(s,8.25,1.75,3.8,2.6,'Contact','Fayçol SALAMI\nFounder — KOWO SARL\nfaycol.salami@getkowo.com\ncontact@getkowo.com\nwww.getkowo.com',{fill:'1C563E',line:'2C7655',dark:true,bar:C.gold});
  chip(s,'Wallet infrastructure',.86,5.1,1.8,'214F39',C.mint); chip(s,'Partner-facing',2.82,5.1,1.55,'214F39',C.mint); chip(s,'Version 1.0',4.55,5.1,1.25,'214F39',C.mint);
  footer(s,22,true);
}

// Warnings
slides.forEach(slide => { warnIfSlideHasOverlaps(slide, pptx, { ignoreDecorativeShapes: true }); warnIfSlideElementsOutOfBounds(slide, pptx); });

pptx.writeFile({ fileName: '/mnt/data/kowo-payment-infrastructure-pack/assets/KOWO_Payment_Infrastructure_Requirements_v1.pptx' });
