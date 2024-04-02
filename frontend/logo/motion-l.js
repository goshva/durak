import {LitElement, html} from 'lit';
import {animate, AnimateController, flyBelow, fade} from '@lit-labs/motion';
import {styles} from './styles2.js';
let g0 = ['H', 'T', 'M','L',"5","-",'G','A','M','E','S'];
 let g00 = ['D', 'U', 'R','A',"K","-",'G','A','M','E'];
export class MotionLit extends LitElement {
  static properties = {
    letters: {type: Array},
  };
  static styles = styles;

  logo = g0;
  

  duration = 5000;
  controller = new AnimateController(this, {
    defaultOptions: {
      keyframeOptions: {
        duration: this.duration,
        fill: 'backwards',
      },
    },
    onComplete: () => this.changeLayout(),
  });
  constructor() {
    super();
    this.addEventListener('click', () => this.clickHandler());
    this.letters = this.logo;
	this.count=0;
  }

  render() {
window.requestAnimationFrame(animate);	  
	  
	  console.log(this.count);
	  this.count +=1;
this.count===9?this.count=0:null;	  
this.count===3?this.logo=g00:null;
this.count===6?this.logo=g0:null;	  
    const delayTime = this.duration / (this.letters.length * 2.5);
    return html`
      ${this.letters?.map(
        (letter, i) => html`<span
            class=${i>5?"letter2":"letter"}
            ${animate({
              keyframeOptions: {
                delay: i * delayTime,
              },
              in: fade,
              out: flyBelow,
            })}
            >${letter}</span
          >`
      )}
    `;
  }

  clickHandler() {
    if (this.controller.isAnimating) {
      this.controller.togglePlay();
    } else {
      this.changeLayout();
    }
  }

  changeLayout() {
	  //console.log(this.count);
	 // this.count +=1;
    this.letters =this.letters.length?[]:this.logo ;
  }
}
customElements.define('motion-lit', MotionLit);
