import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Directive({
  selector: '[appDisableRole]',
})
export class DisableRoleDirective {
  @Input() disableForRole: string;

  constructor(
    private authService: AuthService,
    private renderer: Renderer2,
    public element: ElementRef
  ) {}

  ngAfterViewInit() {
    this.authService.getUser().subscribe((user) => {
      const userRole = user.accountObj.Role;

      if (userRole == this.disableForRole) {
        this.renderer.setStyle(
          this.element.nativeElement,
          'pointer-events',
          'none'
        );
        this.renderer.setStyle(this.element.nativeElement, 'opacity', 0.4);
      }
    });
  }
}
