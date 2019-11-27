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
/* Common imports */
/* Common demo imports */
/* Imports for this component */
/* Demo DOM module */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'px-demo/px-demo-header.js';
import 'px-demo/px-demo-api-viewer.js';
import 'px-demo/px-demo-footer.js';
import 'px-demo/px-demo-configs.js';
import 'px-demo/px-demo-props.js';
import 'px-demo/px-demo-interactive.js';
import 'px-demo/px-demo-component-snippet.js';
import 'px-demo/css/px-demo-content-helper-styles.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <style include="px-demo-content-helper-styles"></style>
    <!-- Header -->
    <px-demo-header module-name="px-clipboard" description="Px-clipboard is used to quickly and easily cut/copy text onto the user's clipboard.
        The value to be cut/copied must be placed in an input/textarea INSIDE px-clipboard, and referenced with copy-from.
        If the copy-from attribute does not exist, the data-clipboard-text property must be used." mobile="" tablet="" desktop="">
    </px-demo-header>

    <!-- Interactive -->
    <px-demo-interactive>
      <!-- Configs -->
      <px-demo-configs slot="px-demo-configs" configs="[[configs]]" props="{{props}}" chosen-config="{{chosenConfig}}"></px-demo-configs>

      <!-- Props -->
      <px-demo-props slot="px-demo-props" props="{{props}}" config="[[chosenConfig]]"></px-demo-props>

      <!-- Component ---------------------------------------------------------->
      <px-demo-component slot="px-demo-component">
        <div>

          <template is="dom-if" if="{{!_isDataCopy(props.dataClipboardText.value)}}">
            <div>
              <px-clipboard copy-from="{{props.copyFrom.value}}" data-clipboard-action="[[props.dataClipboardAction.value]]">
                <template is="dom-if" if="[[_isCutCopy(props.dataClipboardAction.value)]]">
                  <input type="text" class="grabContent text-input" value="[[props.dataClipboardAction.value]] input value">
                </template>
              </px-clipboard>
            </div>
          </template>

          <template is="dom-if" if="{{_isDataCopy(props.dataClipboardText.value)}}">
            <div>
              <px-clipboard data-clipboard-text="{{props.dataClipboardText.value}}">
                Simply click on the button to copy the text associated with it.
              </px-clipboard>
            </div>
          </template>


        </div>
      </px-demo-component>
      <!-- END Component ------------------------------------------------------>

      <px-demo-component-snippet slot="px-demo-component-snippet" element-properties="{{props}}" element-name="px-clipboard" links-includes="[[linksIncludes]]">
      </px-demo-component-snippet>
    </px-demo-interactive>

    <!-- API Viewer -->
    <px-demo-api-viewer source="px-clipboard"></px-demo-api-viewer>

    <!-- Footer -->
    <px-demo-footer></px-demo-footer>
`,

  is: 'px-clipboard-demo',

  properties: {

    /**
     * @property demoProps
     * @type {Object}
     */
    props: {
      type: Object,
      value: function(){ return this.demoProps; }
    },

    /**
     * @property demoProps
     * @type {Array}
     */
    configs: {
      type: Array,
      value: function(){
        return [
            {
              configName: 'Copy',
              copyFrom:  '.grabContent',
              dataClipboardAction: 'copy',
              dataClipboardText: '',
              lightDomContent: '<input type="text" class="grabContent text-input" value="Copy Input Value" />'
            },
            {
              configName: 'Cut',
              copyFrom: '.grabContent',
              dataClipboardAction: 'cut',
              dataClipboardText: '',
              lightDomContent: '<input type="text" class="grabContent text-input" value="Cut Input Value" />'
            },
            {
              configName: 'Copy String',
              copyFrom: '',
              dataClipboardAction: 'copy',
              dataClipboardText: 'This content is not grabbed from an input, but is attached to the clipboard itself',
              lightDomContent: 'Simply click on the button to copy the text associated with it.'
            }
        ];
      }
    }
  },

  /**
   * A reference for `this.props`. Read the documentation there.
   */
  demoProps: {
    dataClipboardAction: {
      type: String,
      defaultValue: 'copy',
      inputType: 'dropdown',
      inputChoices: ['cut','copy']
    },
    copyFrom: {
      type: String,
      defaultValue: ".grabContent"
    },
    dataClipboardText: {
      type: String,
      defaultValue: '',
      inputType: 'text',
      inputDisabled: true
    },
    lightDomContent: {
      type: String,
      defaultValue: '<input type="text" class="grabContent text-input" value="Copy Input Value" />'
    }
  },

  ready: function () {

  },

  _isCutCopy: function(item) {
    return (item && (item === "cut" || item === "copy"));
  },

  _isDataCopy: function(item) {
    return (item && item.length > 0);
  }
});
