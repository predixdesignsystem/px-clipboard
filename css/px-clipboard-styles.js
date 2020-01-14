const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="px-clipboard-styles">
<template>
<style>
@charset "UTF-8";/*! normalize.css v3.0.2 | MIT License | git.io/normalize */html{background-color:var(--px-base-background-color,#fff);font-size:15px;overflow-y:scroll;min-height:100%;box-sizing:border-box}:host,html{color:var(--px-base-text-color,#2c404c);line-height:1.33333;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;text-size-adjust:100%;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased}body,figure{margin:0}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block;vertical-align:baseline}audio:not([controls]){display:none;height:0}[hidden],template{display:none}address,blockquote,dl,fieldset,figure,h1,h2,h3,h4,h5,h6,hr,ol,p,pre,table,ul{margin-bottom:1rem}li>ol,li>ul{margin-bottom:0}dd,ol,ul{margin-left:2rem}img{max-width:100%;border:0}svg:not(:root){overflow:hidden}hr{box-sizing:content-box;height:0}pre{overflow:auto}*,:after,:before{box-sizing:inherit}:host{/*! Comment to prevent cssmin munging this rule with html above and borking Safari */box-sizing:border-box}.flex{display:flex}.inline--flex{display:inline-flex}.flex--row{flex-direction:row}.flex--row--rev{flex-direction:row-reverse}.flex--col{flex-direction:column}.flex--col--rev{flex-direction:column-reverse}.flex--nowrap{flex-wrap:nowrap}.flex--wrap{flex-wrap:wrap}.flex--wrap--rev{flex-wrap:wrap-reverse}.flex--left{justify-content:flex-start}.flex--center{justify-content:center}.flex--right{justify-content:flex-end}.flex--justify{justify-content:space-between}.flex--spaced{justify-content:space-around}.flex--top{align-items:flex-start}.flex--middle{align-items:center}.flex--bottom{align-items:flex-end}.flex--stretch{align-items:stretch}.flex--baseline{align-items:baseline}.flex--top--multi{align-content:flex-start}.flex--middle--multi{align-content:center}.flex--bottom--multi{align-content:flex-end}.flex--stretch--multi{align-content:stretch}.flex--justify--multi{align-content:space-between}.flex--spaced--multi{align-content:space-around}.flex__item{flex:1}.flex__item--msfix{flex:1 1 auto}.flex__item--top{align-self:flex-start}.flex__item--middle{-ms-grid-row-align:center;align-self:center}.flex__item--bottom{align-self:flex-end}.flex__item--baseline{align-self:baseline}.iron{cursor:pointer;height:1.6rem;width:1.6rem;margin-left:5px;color:var(--px-clipboard-icon-color,#000)}.iron:hover{color:var(--px-clipboard-icon-color--hover,#00f)}.iron:active{color:var(--px-clipboard-icon-color--pressed,#00008b)}.iron.copiedIconGreen{color:var(--px-clipboard-icon-color--copied,green)}.fadeOutCopied{transition:opacity 2.5s .4s;opacity:0}.fadeIn{transition:opacity .4s;opacity:1}
</style>
</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);

/*
Copyright (c) 2018, General Electric

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
;