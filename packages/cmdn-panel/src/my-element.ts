import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/express/theme-darkest.js';
import '@spectrum-web-components/theme/express/scale-medium.js';
import '@spectrum-web-components/action-menu/sp-action-menu.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/button/sp-clear-button.js';
import '@spectrum-web-components/button/sp-close-button.js';
import '@spectrum-web-components/overlay/overlay-trigger.js';

import '@spectrum-web-components/icons-workflow/icons/sp-icon-settings.js';

import '@spectrum-web-components/dialog/sp-dialog-wrapper.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';
import '@spectrum-web-components/styles/all-medium-darkest.css';


/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `

  /**
   * The name to say "Hello" to.
   */
  @property()
  name = 'World'

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0

  render() {
    return html`
      <h1>Hello, ${this.name}!</h1>
      <button @click=${this._onClick} part="button">
        Click Count: ${this.count}
      </button>
      <slot></slot>
      <sp-action-menu size="l">
        <span slot="label">More Actions</span>
        <sp-menu-item>Deselect</sp-menu-item>
        <sp-menu-item>Select inverse</sp-menu-item>
        <sp-menu-item>Feather...</sp-menu-item>
        <sp-menu-item>Select and mask...</sp-menu-item>
        <sp-menu-divider></sp-menu-divider>
        <sp-menu-item>Save selection</sp-menu-item>
        <sp-menu-item disabled>Make work path</sp-menu-item>
      </sp-action-menu>
    <overlay-trigger 
      type="modal"
      placement="none">
      <sp-dialog-wrapper
        slot="click-content"
        headline="CMD-N panel"
        mode="fullscreen"
        confirm-label="Keep Both"
        secondary-label="Replace"
        cancel-label="Cancel"
        dismissable
        footer="Content for footer">
          Content of the dialog
        </sp-dialog-wrapper>
        <sp-button
          slot="trigger"
          variant="primary"
          @click= ${this._onDialogClick}
          > 
            Toggle Dialog    
          </sp-button>
        </overlay-trigger>`
  }

  private _onClick() {
    this.count++
  }

  private _onDialogClick() {
    console.log("clicked dialog");
    const overlayTrigger = this.parentElement;
    const dialogWrapper = overlayTrigger.clickContent;
    function handleEvent({type}) {
        // spAlert(this, `<sp-dialog-wrapper> '${type}' event handled.`);
        dialogWrapper.open = false;
        dialogWrapper.removeEventListener('confirm', handleEvent);
        dialogWrapper.removeEventListener('secondary', handleEvent);
        dialogWrapper.removeEventListener('cancel', handleEvent);
    }
    dialogWrapper.addEventListener('confirm', handleEvent);
    dialogWrapper.addEventListener('secondary', handleEvent);
    dialogWrapper.addEventListener('cancel', handleEvent);
  }

  foo(): string {
    return 'foo'
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}
