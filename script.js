let highestZ = 1;

class Paper {
  holdingPaper = false;
  rotating = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  currX = 0;
  currY = 0;
  prevX = 0;
  prevY = 0;
  velocityX = 0;
  velocityY = 0;
  rotation = Math.random() * 25 - 15;
  currentPaperX = 0;
  currentPaperY = 0;

  init(paper) {
    document.addEventListener('mousemove', (e) => {
      if(!this.rotating) {
        this.currX = e.clientX;
        this.currY = e.clientY;
        
        this.velocityX = this.currX - this.prevX;
        this.velocityY = this.currY - this.prevY;
      }
        
      const dirX = e.clientX - this.mouseTouchX;
      const dirY = e.clientY - this.mouseTouchY;
      const dirLength = Math.sqrt(dirX*dirX+dirY*dirY);
      const dirNormalizedX = dirX / dirLength;
      const dirNormalizedY = dirY / dirLength;

      const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
      let degrees = 175 * angle / Math.PI;
      degrees = (360 + Math.round(degrees)) % 360;
      if(this.rotating) {
        this.rotation = degrees;
      }

      if(this.holdingPaper) {
        if(!this.rotating) {
          this.currentPaperX += this.velocityX;
          this.currentPaperY += this.velocityY;
        }
        this.prevX = this.currX;
        this.prevY = this.currY;

        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    })

    paper.addEventListener('mousedown', (e) => {
      if(this.holdingPaper) return; 
      this.holdingPaper = true;
      
      paper.style.zIndex = highestZ;
      highestZ += 1;
      
      if(e.button === 0) {
        this.mouseTouchX = this.currX;
        this.mouseTouchY = this.currY;
        this.prevX = this.currX;
        this.prevY = this.currY;
      }
      if(e.button === 2) {
        this.rotating = true;
      }
    });
    window.addEventListener('mouseup', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});