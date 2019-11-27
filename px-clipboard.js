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
/* this is an html page that imports the clipboard.js library in a way that allows reuse of the library. */
/**

### Usage

    <px-clipboard copy-from="#copyMe"><input type="text" value="copy me" id="copyMe"/></px-clipboard>

Or, to cut:

    <px-clipboard data-clipboard-action="cut" copy-from="#cutMe"><input type="text" value="Cut me" id="cutMe"/></px-clipboard>

Or, with no input/textarea:

    <px-clipboard data-clipboard-text="This text will be copied."></px-clipboard>

### Styling
The following custom properties are available for styling:

Custom property | Description | Default
----------------|-------------|----------
`--px-clipboard-icon-color` | The color of the copy icon | $gray8
`--px-clipboard-icon-color--hover` | The color of the copy icon when hovered | $primary-blue
`--px-clipboard-icon-color--pressed`  | The color of the copy icon when pressed | $primary-blue-pressed
`--px-clipboard-icon-color--copied` | The color of the copy icon when pressed and copy is complete | $dv-basic-green

@element px-clipboard
@blurb Element allowing copy/cut to clipboard.
@homepage index.html
@demo index.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'px-icon-set/px-icon-set-utility.js';
import 'px-icon-set/px-icon.js';
import './css/px-clipboard-styles.js';
import './clipboard.js.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
Polymer({
  _template: html`
    <style include="px-clipboard-styles"></style>

    <div class="flex flex--left">
      <div class="flex__item flex__item--msfix">
        <slot></slot>
      </div>
      <div class="iron">
        <px-icon title="copy" icon="px-utl:copy" id="copy"></px-icon>
      </div>
    </div>
`,

  is: 'px-clipboard',

  /**
   * Properties block, expose attribute values to the DOM via 'notify'
   *
   * @property properties
   * @type Object
   */
  properties: {
    /**
     * An attribute that allows you to cut text (vs copy).
     * Available options are 'cut' or 'copy'
     * @property dataClipboardAction
     * @type String
     */
    dataClipboardAction: {
      type: String,
      value: ''
    },
    /**
     * An attribute that points to the element holding the value
     * you'd like to cut or copy.
     * Possible options are `tag`, `class` or `ID`.
     * @property copyFrom
     * @type String
     */
    copyFrom: {
      type: String,
      value: ''
    },
    /**
     *
     * An object that holds a reference to the node from which the value is copied/cut from.
     *
     * @property _copyFromElem
     * @type Objecct
     */
    _copyFromElem: {
      type: Object,
      observer: '_initializeClipboard'
    },
    /**
     * An attribute that allows you to set the text that will go into the clipboard.
     *
     * @property dataClipboardText
     * @type String
     */
    dataClipboardText: {
      type: String,
      value: '',
      observer: '_updateText'
    },
    /**
     * An attribute holds the Clipboard object.
     *
     * @property _clipboard
     * @type Object
     */
    _clipboard: {
      type: Object
    },
    /**
     * A boolean which reflects whether the "copied" text should be visible.
     * @type {Boolean}
     * @prop _showCopiedText
     */
    _showCopiedText: {
      type: Boolean,
      value: false
    }
  },

  attached: function() {
    var slot = this.$$('slot'),
        copy = this.$$('#copy');

    if(this.copyFrom){
      //this calls the _setCopyFrom method when the slot is loaded, and makes sure the Polymer this is bound to that function.
      dom(slot).observeNodes(this._setCopyFrom.bind(this));
    }
    //check whether this is a text only clipboard element.
    if (this.dataClipboardText) {
      //initialize clipboard`
      this._clipboard = this._initializeTextOnly(copy);
      //and initialze the events
      this._setEventFire();
    }
  },

  detached: function() {
    //clean up after ourselves.
    this._destroy();
  },

  _destroy: function() {
    //removes the current Clipboard instance, if it exists.
    if (this._clipboard) {
      this._clipboard.destroy();
    }
  },

  /**
   * This method is called when the the text to be copied is updated on a copy where data-clipboard-text is used.
   * It destroys the old copy, initilizes a new Clipboard object with the new text property, and sets the listeners on the new Clipboard object
   *
   * @method _updateText
   */
  _updateText: function() {
    var copy = this.$$('#copy');
    if (this.dataClipboardText) {
      this._destroy();
      this._clipboard = this._initializeTextOnly(copy);
      this._setEventFire();
    }

  },

  /**
   * This method is called when the _copyFromElem property changes (the light dom is loaded).
   * It initilizes a clipboard object.
   *
   * @method _initializeClipboard
   */
  _initializeClipboard: function() {
    var copy = this.$$('#copy');

    //check that we aren't dealing with a text only clipboard
    if (!this.dataClipboardText) {
      //initialze our clipboard object
      this._clipboard = this._initializeCopy(copy);

      //and if it's a cut action, set that up.
      if (this.dataClipboardAction) {
        this._clipboard.action = function(trigger) {
          return this.dataClipboardAction;
        }.bind(this);
      }

      //lastly, we turn on listeners that will fire events.
      this._setEventFire();
    }
  },

  /**
   * This method captures the internal success/error message sent by the clipboard
   * and calls _success or _error.
   *
   * @method _initializeClipboard
   */
  _setEventFire: function() {

    //listen to a success or error event. I put these here since "success" or "error" are really generic, and I wanted better event Names.
    this._clipboard.on('success', function(e) {
      this._success(e);
      this.set('_showCopiedText', true);
      this._changeIcon();

    }.bind(this))
    .on('error', function(e) {
      this._error(e);
    }.bind(this));
  },

  _changeIcon: function() {
    var ironIcon = dom(this.root).querySelector('px-icon'),
        copiedIcon = dom(this.root).querySelector('.iron');

    ironIcon.icon ='px-utl:confirmed';
    copiedIcon.classList.add('copiedIconGreen', 'fadeOutCopied');

    if (this._showCopiedText) {
      copiedIcon.classList.remove('fadeIn');
      this.distributeContent();
    }

    setTimeout(function() {
      ironIcon.icon ='px-utl:copy';
      copiedIcon.classList.remove('copiedIconGreen', 'fadeOutCopied');
      copiedIcon.classList.add('fadeIn');
      this.distributeContent();
    }.bind(this), 2000);

  },

  /**
   * This method finds the element specified in copyFrom, and sets _copyFromElem
   *
   * @method _setCopyFrom
   *
   */
  _setCopyFrom: function() {
    //find the element we are copying from
    var copyFrom  = dom(this).querySelector(this.copyFrom);
    //and set _copyFromElem to that element.
    this.set('_copyFromElem', copyFrom);
  },

  /**
   * This method returns a new instance of the Clipboard object
   * and sets the _copyFrom property
   *
   * @method _initializeCopy
   * @return {Clipboard Object}
   */
  _initializeCopy: function(copy) {

    //check we have an attribute telling us where to copy from
    if (this.copyFrom) {
      //since we do, let's set it up as an element reference
      this._setCopyFrom();
      //and return a new Clipboard object that points to this element.
      return new Clipboard(copy,
        { target:
            function(trigger) {
              return this._copyFromElem;
          }.bind(this)
        }
      );
    } else {
      throw "You must specify where you'd like the value copied/cut from using the copy-from attribute";
    }
  },

  /**
   * This method returns a new instance of the Clipboard object
   * that has text set on it using the data-clipboard-text attribute
   *
   * @method _initializeTextOnly
   * @return {Clipboard Object}
   *
   */
  _initializeTextOnly: function(copy) {
    //we return a new Clipboard instance that has a text property set on it.
    return new Clipboard(copy,
      { text:
          function(trigger) {
            return this.dataClipboardText;
        }.bind(this)
      }
    );
  },

  /*
  * This event is fired after a successful copy/cut.
  *  @event clipboardSuccess
  */
  /*
  * This method fires off a clipboardSuccess event
  *  @method _success
  */
  _success: function(e) {
    this.fire('pxClipboardSuccess', e);
  },

  /*
  * This event is fired after an error occurs with copy/cut.
  *  @event clipboardError
  */
  /*
  * This method fires off a clipboardError event
  *  @method _error
  */
  _error: function(e) {
    this.fire('pxClipboardError', e);
  }
});
