(()=>{"use strict";var t={393:(t,o)=>{Object.defineProperty(o,"__esModule",{value:!0}),o.HttpRequest=void 0,o.HttpRequest=class{location;constructor(t){this.location=t}post(t){return fetch(this.location,{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json",Accept:"application/json"}})}}},399:(t,o,e)=>{Object.defineProperty(o,"__esModule",{value:!0}),o.HubSpotForms=void 0;const s=e(393);o.HubSpotForms=class{buildFormSubmission(t,o){const e=this.getCookieValue("hubspotutk");return{submittedAt:(+new Date).toString(),fields:t,context:{hutk:e,pageUri:location.href,pageName:document.title},legalConsentOptions:{consent:{consentToProcess:o,text:"I have read and agree with the terms and conditions and privacy statement of Fung."}}}}async sendContactForm(t,o){const e=this.buildFormSubmission(t,o);await new s.HttpRequest("https://api.hsforms.com/submissions/v3/integration/submit/:portalId/:formGuid").post(e)}async sendSandboxForm(t,o){const e=this.buildFormSubmission(t,o);await new s.HttpRequest("https://api.hsforms.com/submissions/v3/integration/submit/:portalId/:formGuid").post(e)}getCookieValue(t){return document.cookie.match("(^|;)\\s*"+t+"\\s*=\\s*([^;]+)")?.pop()||""}}}},o={};function e(s){var n=o[s];if(void 0!==n)return n.exports;var i=o[s]={exports:{}};return t[s](i,i.exports,e),i.exports}(()=>{const t=e(399);new class{hubSpotForms;constructor(t){this.hubSpotForms=t,this.setupListeners()}setupListeners(){const t=document.getElementById("wf-form-Get-sandbox-access");t&&t.addEventListener("submit",(o=>this.onSandboxFormSubmit(o,t)));const o=document.getElementById("wf-form-Contactform");o&&o.addEventListener("submit",(t=>this.onContactFormSubmit(t,o)))}onSandboxFormSubmit(t,o){console.log(o.getElementsByTagName("input")),this.hubSpotForms.sendSandboxForm([],!0)}onContactFormSubmit(t,o){console.log(o.getElementsByTagName("input")),this.hubSpotForms.sendContactForm([],!0)}}(new t.HubSpotForms)})()})();