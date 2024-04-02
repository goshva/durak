import {css} from 'lit';

export const styles = [
  css`
    :host {
      display: flex;
      height: 100%;
      width: 100%;
      align-items:flex-start; 
     /*  position: relative;
      overflow: hidden; */
      color: #040424;
      cursor: pointer;
    }

    .letter {
      flex: 1;
      font-size: 10vw;
      text-align: center;
      will-change: transform;
      background: linear-gradient(
        0deg,
        rgba(2, 0, 36, 1) 0%,
        rgba(9, 33, 121, 1) 35%,
        rgba(0, 212, 255, 1) 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
	.letter2 {
     flex: 1;
    font-size: 10vw;
    text-align: center;
    will-change: transform;
   background: linear-gradient(250deg, rgb(0 188 212 / 81%) 0%, #FF9800 35%, #e91e54 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: #00000040;
    }

    .info {
      position: absolute;
      right: 2px;
      bottom: 2px;
    }
  `,
];
