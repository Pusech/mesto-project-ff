(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-1",headers:{authorization:"38fef25e-caa8-4f1e-be7e-5ebd7063f6ef","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},n=fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return t(e)})).catch((function(e){return console.log(e)})),o=fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return t(e)})).catch((function(e){return console.log(e)}));function r(e,t){fetch("https://nomoreparties.co/v1/wff-cohort-1/cards/".concat(t),{method:"DELETE",headers:{authorization:"38fef25e-caa8-4f1e-be7e-5ebd7063f6ef","Content-Type":"application/json"}}).then((function(t){return t.ok?(e.remove(),t):Promise.reject("Ошибка: ".concat(t.status))})).catch((function(e){return console.log(e)}))}var c=document.querySelector("#card-template").content,a=function(e,t,n,o){var r=c.querySelector(".places__item").cloneNode(!0),a=r.querySelector(".card__image"),u=r.querySelector(".card__like-button");a.src=e.link,a.alt=e.name,r.querySelector(".card__title").textContent=e.name,e.owner._id===o?r.querySelector(".card__delete-button").addEventListener("click",(function(){t(r,e._id)})):r.querySelector(".card__delete-button").remove(),a.addEventListener("click",(function(){n(e.link,e.name)})),e.likes.find((function(e){return e._id===o}))&&u.classList.add("card__like-button_is-active");var i=r.querySelector(".card__like-count");return i.textContent=e.likes.length,u.addEventListener("click",(function(){!function(e,t,n){e.classList.contains("card__like-button_is-active")?function(e){return fetch("https://nomoreparties.co/v1/wff-cohort-1/cards/likes/".concat(e),{method:"DELETE",headers:{authorization:"38fef25e-caa8-4f1e-be7e-5ebd7063f6ef","Content-Type":"application/json"}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(t).then((function(t){n.textContent=t.likes.length,e.classList.toggle("card__like-button_is-active")})).catch((function(e){return console.log(e)})):function(e){return fetch("https://nomoreparties.co/v1/wff-cohort-1/cards/likes/".concat(e),{method:"PUT",headers:{authorization:"38fef25e-caa8-4f1e-be7e-5ebd7063f6ef","Content-Type":"application/json"}}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(t).then((function(t){n.textContent=t.likes.length,e.classList.toggle("card__like-button_is-active")})).catch((function(e){return console.log(e)}))}(u,e._id,i)})),r};function u(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",s)}function i(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",s)}function s(e){"Escape"===e.key&&document.querySelector(".popup_is-opened").classList.remove("popup_is-opened")}function l(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n),r.classList.remove(o),r.textContent=""}function p(e,t,n){!function(e){return e.every((function(e){return e.validity.valid}))}(e)?(t.setAttribute("disabled",""),t.classList.add(n)):(t.removeAttribute("disabled"),t.classList.remove(n))}function d(e,t){t.formSelector;var n=t.inputSelector,o=t.submitButtonSelector,r=t.inactiveButtonClass,c=t.inputErrorClass,a=t.errorClass;Array.from(e.querySelectorAll(n)).forEach((function(t){l(e,t,c,a)}));var u=e.querySelector(o);u.setAttribute("disabled",""),u.classList.add(r)}var f=document.querySelector(".places__list"),_=document.querySelector(".popup_type_new-card"),m=document.querySelector(".popup_type_edit"),y=document.querySelector(".popup_type_image"),h=document.querySelector(".profile__add-button"),v=document.querySelector(".profile__edit-button"),S=document.querySelectorAll(".popup"),b=document.querySelector(".profile__title"),q=document.querySelector(".profile__description"),g=document.querySelector(".profile__image"),k=document.querySelector(".profile__image-container"),C=document.querySelector(".popup_type_edit"),L=C.querySelector(".popup__input_type_name"),E=C.querySelector(".popup__input_type_description"),x=C.querySelector(".popup__button"),A=document.querySelector(".popup_type_new-card"),j=A.querySelector(".popup__input_type_card-name"),T=A.querySelector(".popup__input_type_url"),w=A.querySelector(".popup__button"),P=document.querySelector(".popup_type_profile-image"),U=P.querySelector(".popup__input_type_profile-image"),B=P.querySelector(".popup__button"),D=document.querySelector(".popup__image"),z=document.querySelector(".popup__caption");function N(e,t){D.src=e,D.alt=t,z.textContent=t,u(y)}h.addEventListener("click",(function(){u(_),d(_,G)})),v.addEventListener("click",(function(){L.value=b.textContent,E.value=q.textContent,u(m),d(m,G)})),k.addEventListener("click",(function(){u(P),d(P,G)})),S.forEach((function(e){e.addEventListener("click",(function(t){t.target.classList.contains("popup__close")&&i(e),function(e){e.target.classList.contains("popup")&&i(e.target)}(t)}))})),C.addEventListener("submit",(function(n){var o,r;n.preventDefault(),K(!0,x),(o=L.value,r=E.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:o,about:r})}).then((function(e){return t(e)}))).then((function(e){b.textContent=e.name,q.textContent=e.about,i(C)})).catch((function(e){return console.log(e)})).finally((function(){K(!1,x)}))})),A.addEventListener("submit",(function(n){var o,c;n.preventDefault(),K(!0,w),(o=j.value,c=T.value,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:o,link:c})}).then((function(e){return t(e)}))).then((function(e){f.prepend(a(e,r,N,e.owner._id)),i(A),n.target.reset()})).catch((function(e){return console.log(e)})).finally((function(){K(!1,w)}))}));var O,J,M,H,I,V,F,G={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"};function K(e,t){t.textContent=e?"Сохранение...":t.dataset.btnText}J=(O=G).formSelector,M=O.inputSelector,H=O.submitButtonSelector,I=O.inactiveButtonClass,V=O.inputErrorClass,F=O.errorClass,Array.from(document.querySelectorAll(J)).forEach((function(e){!function(e,t,n,o,r,c){var a=Array.from(e.querySelectorAll(t)),u=e.querySelector(n);p(a,u,o),a.forEach((function(t){t.addEventListener("input",(function(){!function(e,t,n,o){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?l(e,t,n,o):function(e,t,n,o,r){var c=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o),c.textContent=n,c.classList.add(r)}(e,t,t.validationMessage,n,o)}(e,t,r,c),p(a,u,o)}))}))}(e,M,H,I,V,F)})),Promise.all([n,o]).then((function(e){q.textContent=e[0].about,b.textContent=e[0].name,g.style.backgroundImage="url(".concat(e[0].avatar,")");var t=e[0]._id;e[1].forEach((function(e){f.append(a(e,r,N,t))}))})),P.addEventListener("submit",(function(n){var o;n.preventDefault(),K(!0,B),(o=U.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:o})}).then((function(e){return t(e)}))).then((function(e){g.style.backgroundImage="url(".concat(e.avatar,")"),i(P),n.target.reset()})).catch((function(e){return console.log(e)})).finally((function(){K(!1,B)}))}))})();