// buy pudding and yogurt

import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
    selector: '[my-hover-effect]'
})

export class HoverEffectDirective {
    private xCoord: number;
    private yCoord: number;
    private el: HTMLElement;
    private element: Object = {
        top: null,
        bottom: null,
        left: null,
        right: null,
        height: null,
        width: null
    };

    constructor(private _el: ElementRef) {
        this.el = _el.nativeElement;
    }

    @HostListener('mousemove', ['$event']) onMouseMove(e: any): void {
        this.calculateCoordPercentage(e.clientX, e.clientY);
        this.animate(this.xCoord, this.yCoord);
    }
    @HostListener('mouseenter') onMouseEnter(): void {
        this.setElementDimensions();
        this.el.style.transition = '.5s';
        this.createShineElement();
    }
    @HostListener('mouseleave') onMouseExit(): void {
        this.el.style.transition = '2s';
        this.el.style.transform = '';
        this.el.style.boxShadow = '';
        this.destroyShineElement();
    }

    setElementDimensions(): void {
        let elDim = this.el.getBoundingClientRect();
        this.element['top'] = elDim.top;
        this.element['right'] = elDim.right;
        this.element['bottom'] = elDim.bottom;
        this.element['left'] = elDim.left;
        this.element['width'] = elDim.width;
        this.element['height'] = elDim.height;
    }

    // x0 y0 == upper left corner x1 y1 == lower right corner
    calculateCoordPercentage(x: number, y: number): void {
        let xRelativeCoord: number = x - this.element['left'],
            yRelativeCoord: number = y - this.element['top'],
            xHalfwayPoint: number = (this.element['width'] / 2),
            yHalfwayPoint = (this.element['height'] / 2),
            xDistanceFromHalf: number = xRelativeCoord - xHalfwayPoint,
            yDistanceFromHalf: number = yRelativeCoord - yHalfwayPoint;

        this.xCoord = xDistanceFromHalf / xHalfwayPoint;
        this.yCoord = yDistanceFromHalf / yHalfwayPoint;
    }

    animate(x: number, y: number): void {
        this.animateDiv(x, y);
        this.animateShadow(x, y);
        this.animateShine(x, y);
    }

    animateDiv(x: number, y: number): void {
        let rotateY = (x * this.element['width']) / 15,
            rotateX = (y * -this.element['height']) / 15;
        this.el.style.transition = '';
        this.el.style.transform = 'rotateX(' + (rotateX) + 'deg)';
        this.el.style.transform += 'rotateY(' + (rotateY) + 'deg)';
    }

    animateShadow(x: number, y: number): void {
        let shadowX = x * 10,
            shadowY = y * 20;
        this.el.style.boxShadow = shadowX + 'px ' + shadowY + 'px 10px black';
    }

// SHINE =====

    createShineElement() {
        let node: HTMLElement = document.createElement('div');
        node.setAttribute('id', 'hover-effect-shine');
        node.style.position = 'absolute';
        node.style.top = '0';
        node.style.bottom = '0';
        node.style.left = '0';
        node.style.right = '0';
        this.el.appendChild(node);
    }

    destroyShineElement() {
        let childToRemove = document.getElementById('hover-effect-shine');
        this.el.removeChild(childToRemove);
    }

    calculateDegreeFromCenter(xCoord: number, yCoord: number): string {
        let radialValue = Math.atan2(xCoord, yCoord),
            degreeValue = radialValue * 180 / Math.PI;
        // if (degreeValue < 0 ) { degreeValue += 360; }
        console.log(degreeValue, 'deg');
        return degreeValue * -1 + 'deg';
    }

    animateShine(x: number, y: number): void {
        let deg: string = this.calculateDegreeFromCenter(x, y),
            // giving back which ever value is closer to 1
            opacity: number = Math.max(Math.abs(y), Math.abs(x)),
            shine: HTMLElement = document.getElementById('hover-effect-shine'),
            gradient1: string = 'linear-gradient(' + deg + ', rgba(255, 255, 255, ' + opacity + ') 0%,',
            gradient2 = ' rgba(255,255,255,0) 80%)',
            gradient = gradient1  + gradient2;
        shine.style.backgroundImage = gradient;

    }
}
