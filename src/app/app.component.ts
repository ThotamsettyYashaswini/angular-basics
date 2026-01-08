import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'finsta-v1';
//  private ctrlPressed = false;
//   private currentSequence: 'none' | 'ctrl+l' | 'ctrl+c' = 'none';
//   private timeoutId: any;
//     constructor(private router: Router) {}

//  @HostListener('document:keydown', ['$event'])
//   handleKeyboardEvent(event: KeyboardEvent) {
//     const target = event.target as HTMLElement;
//     const isInputOrTextarea = ['INPUT', 'TEXTAREA'].includes(target.tagName);

//     if (event.ctrlKey && event.key.toLowerCase() === 'la' && !isInputOrTextarea) {
//       event.preventDefault();  // Prevent default paste behavior
//       this.router.navigate(['/LayoutAdd-Ons']);
//     }

//     if (event.ctrlKey && event.key.toLowerCase() === 'l' && !isInputOrTextarea) {
//       event.preventDefault();  // Prevent default paste behavior
//       this.router.navigate(['/LandPurchase']);
//     }
//   }

// @HostListener('document:keydown', ['$event'])
//   handleKeyDown(event: KeyboardEvent) {
//     const target = event.target as HTMLElement;

//     // Ignore input and textarea to prevent interfering with typing
//     if (['INPUT', 'TEXTAREA'].includes(target.tagName)) return;

//     const key = event.key.toLowerCase();

//     if (key === 'control') {
//       this.ctrlPressed = true;
//       return;
//     }

//     if (!this.ctrlPressed) return;

//     // Clear existing timeout if any (reset sequence timer)
//     if (this.timeoutId) {
//       clearTimeout(this.timeoutId);
//       this.timeoutId = null;
//     }

//     switch (this.currentSequence) {
//       case 'none':
//         if (key === 'l') {
//           event.preventDefault();
//           this.currentSequence = 'ctrl+l';

//           // If no 'a' pressed within 400ms, navigate to /LandPurchase
//           this.timeoutId = setTimeout(() => {
//             this.router.navigate(['/LandPurchase']);
//             this.reset();
//           }, 400);
//         } else if (key === 'c') {
//           event.preventDefault();
//           this.currentSequence = 'ctrl+c';

//           // If no 'a' pressed within 400ms, navigate to /CourtCaseDetails
//           this.timeoutId = setTimeout(() => {
//             this.router.navigate(['/CourtCaseDetails']);
//             this.reset();
//           }, 400);
//         } else if (key === 'm') {
//           event.preventDefault();
//           this.router.navigate(['/MutationDetails']);
//           this.reset();
//         }
//         break;

//       case 'ctrl+l':
//         if (key === 'a') {
//           event.preventDefault();
//           this.router.navigate(['/LayoutAdd-Ons']);
//           this.reset();
//         }
//         break;

//       case 'ctrl+c':
//         if (key === 'a') {
//           event.preventDefault();
//           this.router.navigate(['/ViewCourtDetailsNew']);
//           this.reset();
//         }
//         break;
//     }
//   }

//   @HostListener('document:keyup', ['$event'])
//   handleKeyUp(event: KeyboardEvent) {
//     if (event.key.toLowerCase() === 'control') {
//       this.reset();
//     }
//   }

//   private reset() {
//     this.ctrlPressed = false;
//     this.currentSequence = 'none';
//     if (this.timeoutId) {
//       clearTimeout(this.timeoutId);
//       this.timeoutId = null;
//     }
//   }
}


