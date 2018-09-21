/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __extends, __decorate, __metadata } from 'tslib';
import { ComponentFactoryResolver, Directive, EventEmitter, NgModule, Output, TemplateRef, ViewContainerRef } from '@angular/core';

/**
 * Throws an exception when attempting to attach a null portal to a host.
 * @docs-private
 */
function throwNullPortalError() {
    throw Error('Must provide a portal to attach');
}
/**
 * Throws an exception when attempting to attach a portal to a host that is already attached.
 * @docs-private
 */
function throwPortalAlreadyAttachedError() {
    throw Error('Host already has a portal attached');
}
/**
 * Throws an exception when attempting to attach a portal to an already-disposed host.
 * @docs-private
 */
function throwPortalOutletAlreadyDisposedError() {
    throw Error('This PortalOutlet has already been disposed');
}
/**
 * Throws an exception when attempting to attach an unknown portal type.
 * @docs-private
 */
function throwUnknownPortalTypeError() {
    throw Error('Attempting to attach an unknown Portal type. BasePortalOutlet accepts either ' +
        'a ComponentPortal or a TemplatePortal.');
}
/**
 * Throws an exception when attempting to attach a portal to a null host.
 * @docs-private
 */
function throwNullPortalOutletError() {
    throw Error('Attempting to attach a portal to a null PortalOutlet');
}
/**
 * Throws an exception when attempting to detach a portal that is not attached.
 * @docs-private
 */
function throwNoPortalAttachedError() {
    throw Error('Attempting to detach a portal that is not attached to a host');
}

/**
 * A `Portal` is something that you want to render somewhere else.
 * It can be attach to / detached from a `PortalOutlet`.
 */
var Portal = /** @class */ (function () {
    function Portal() {
    }
    /** Attach this portal to a host. */
    Portal.prototype.attach = function (host) {
        if (host == null) {
            throwNullPortalOutletError();
        }
        if (host.hasAttached()) {
            throwPortalAlreadyAttachedError();
        }
        this._attachedHost = host;
        return host.attach(this);
    };
    /** Detach this portal from its host */
    Portal.prototype.detach = function () {
        var host = this._attachedHost; //tslint:disable-line
        if (host == null) {
            throwNoPortalAttachedError();
        }
        else {
            this._attachedHost = null;
            host.detach();
        }
    };
    Object.defineProperty(Portal.prototype, "isAttached", {
        /** Whether this portal is attached to a host. */
        get: function () {
            return this._attachedHost != null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the PortalOutlet reference without performing `attach()`. This is used directly by
     * the PortalOutlet when it is performing an `attach()` or `detach()`.
     */
    Portal.prototype.setAttachedHost = function (host) {
        this._attachedHost = host;
    };
    return Portal;
}());
/**
 * A `ComponentPortal` is a portal that instantiates some Component upon attachment.
 */
var ComponentPortal = /** @class */ (function (_super) {
    __extends(ComponentPortal, _super);
    function ComponentPortal(component, viewContainerRef, injector) {
        var _this = _super.call(this) || this;
        _this.component = component;
        _this.viewContainerRef = viewContainerRef;
        _this.injector = injector;
        return _this;
    }
    return ComponentPortal;
}(Portal));
/**
 * A `TemplatePortal` is a portal that represents some embedded template (TemplateRef).
 */
var TemplatePortal = /** @class */ (function (_super) {
    __extends(TemplatePortal, _super);
    function TemplatePortal(template, viewContainerRef, context) {
        var _this = _super.call(this) || this;
        _this.templateRef = template;
        _this.viewContainerRef = viewContainerRef;
        _this.context = context;
        return _this;
    }
    Object.defineProperty(TemplatePortal.prototype, "origin", {
        get: function () {
            return this.templateRef.elementRef;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Attach the the portal to the provided `PortalOutlet`.
     * When a context is provided it will override the `context` property of the `TemplatePortal`
     * instance.
     */
    TemplatePortal.prototype.attach = function (host, context) {
        if (context === void 0) { context = this.context; }
        this.context = context;
        return _super.prototype.attach.call(this, host);
    };
    TemplatePortal.prototype.detach = function () {
        this.context = undefined;
        return _super.prototype.detach.call(this); //tslint:disable-line
    };
    return TemplatePortal;
}(Portal));
/**
 * Partial implementation of PortalOutlet that handles attaching
 * ComponentPortal and TemplatePortal.
 */
var BasePortalOutlet = /** @class */ (function () {
    function BasePortalOutlet() {
        /** Whether this host has already been permanently disposed. */
        this._isDisposed = false;
    }
    /** Whether this host has an attached portal. */
    BasePortalOutlet.prototype.hasAttached = function () {
        return !!this._attachedPortal;
    };
    /** Attaches a portal. */
    BasePortalOutlet.prototype.attach = function (portal) {
        if (!portal) {
            throwNullPortalError();
        }
        if (this.hasAttached()) {
            throwPortalAlreadyAttachedError();
        }
        if (this._isDisposed) {
            throwPortalOutletAlreadyDisposedError();
        }
        if (portal instanceof ComponentPortal) {
            this._attachedPortal = portal;
            return this.attachComponentPortal(portal);
        }
        else if (portal instanceof TemplatePortal) {
            this._attachedPortal = portal;
            return this.attachTemplatePortal(portal);
        }
        throwUnknownPortalTypeError();
    };
    /** Detaches a previously attached portal. */
    BasePortalOutlet.prototype.detach = function () {
        if (this._attachedPortal) {
            this._attachedPortal.setAttachedHost(null);
            this._attachedPortal = null;
        }
        this._invokeDisposeFn();
    };
    /** Permanently dispose of this portal host. */
    BasePortalOutlet.prototype.dispose = function () {
        if (this.hasAttached()) {
            this.detach();
        }
        this._invokeDisposeFn();
        this._isDisposed = true;
    };
    /** @docs-private */
    BasePortalOutlet.prototype.setDisposeFn = function (fn) {
        this._disposeFn = fn;
    };
    BasePortalOutlet.prototype._invokeDisposeFn = function () {
        if (this._disposeFn) {
            this._disposeFn();
            this._disposeFn = null;
        }
    };
    return BasePortalOutlet;
}());

/**
 * A PortalOutlet for attaching portals to an arbitrary DOM element outside of the Angular
 * application context.
 */
var DomPortalOutlet = /** @class */ (function (_super) {
    __extends(DomPortalOutlet, _super);
    function DomPortalOutlet(
    /** Element into which the content is projected. */
    outletElement, _componentFactoryResolver, _appRef, _defaultInjector) {
        var _this = _super.call(this) || this;
        _this.outletElement = outletElement;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this._appRef = _appRef;
        _this._defaultInjector = _defaultInjector;
        return _this;
    }
    /**
     * Attach the given ComponentPortal to DOM element using the ComponentFactoryResolver.
     * @param portal Portal to be attached
     * @returns Reference to the created component.
     */
    DomPortalOutlet.prototype.attachComponentPortal = function (portal) {
        var _this = this;
        var componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component); //tslint:disable-line
        var componentRef;
        // If the portal specifies a ViewContainerRef, we will use that as the attachment point
        // for the component (in terms of Angular's component tree, not rendering).
        // When the ViewContainerRef is missing, we use the factory to create the component directly
        // and then manually attach the view to the application.
        if (portal.viewContainerRef) {
            componentRef = portal.viewContainerRef.createComponent(componentFactory, portal.viewContainerRef.length, portal.injector || portal.viewContainerRef.parentInjector); //tslint:disable-line
            this.setDisposeFn(function () { return componentRef.destroy(); });
        }
        else {
            componentRef = componentFactory.create(portal.injector || this._defaultInjector);
            this._appRef.attachView(componentRef.hostView);
            this.setDisposeFn(function () {
                _this._appRef.detachView(componentRef.hostView);
                componentRef.destroy();
            });
        }
        // At this point the component has been instantiated, so we move it to the location in the DOM
        // where we want it to be rendered.
        this.outletElement.appendChild(this._getComponentRootNode(componentRef));
        return componentRef;
    };
    /**
     * Attaches a template portal to the DOM as an embedded view.
     * @param portal Portal to be attached.
     * @returns Reference to the created embedded view.
     */
    DomPortalOutlet.prototype.attachTemplatePortal = function (portal) {
        var _this = this;
        var viewContainer = portal.viewContainerRef; //tslint:disable-line
        var viewRef = viewContainer.createEmbeddedView(portal.templateRef, portal.context); //tslint:disable-line
        viewRef.detectChanges();
        // The method `createEmbeddedView` will add the view as a child of the viewContainer.
        // But for the DomPortalOutlet the view can be added everywhere in the DOM
        // (e.g Overlay Container) To move the view to the specified host element. We just
        // re-append the existing root nodes.
        viewRef.rootNodes.forEach(function (rootNode) { return _this.outletElement.appendChild(rootNode); });
        this.setDisposeFn((function () {
            var index = viewContainer.indexOf(viewRef); //tslint:disable-line
            if (index !== -1) {
                viewContainer.remove(index);
            }
        }));
        return viewRef;
    };
    /**
     * Clears out a portal from the DOM.
     */
    DomPortalOutlet.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this.outletElement.parentNode != null) {
            this.outletElement.parentNode.removeChild(this.outletElement);
        }
    };
    /** Gets the root HTMLElement for an instantiated component. */
    DomPortalOutlet.prototype._getComponentRootNode = function (componentRef) {
        return componentRef.hostView.rootNodes[0];
    };
    return DomPortalOutlet;
}(BasePortalOutlet));

/**
 * Directive version of a `TemplatePortal`. Because the directive *is* a TemplatePortal,
 * the directive instance itself can be attached to a host, enabling declarative use of portals.
 */
var CdkPortal = /** @class */ (function (_super) {
    __extends(CdkPortal, _super);
    function CdkPortal(templateRef, viewContainerRef) {
        return _super.call(this, templateRef, viewContainerRef) || this;
    }
    CdkPortal = __decorate([
        Directive({
            selector: '[cdk-portal], [cdkPortal], [portal]',
            exportAs: 'cdkPortal'
        }),
        __metadata("design:paramtypes", [TemplateRef, ViewContainerRef])
    ], CdkPortal);
    return CdkPortal;
}(TemplatePortal));
/**
 * Directive version of a PortalOutlet. Because the directive *is* a PortalOutlet, portals can be
 * directly attached to it, enabling declarative use.
 *
 * Usage:
 * `<ng-template [cdkPortalOutlet]="greeting"></ng-template>`
 */
var CdkPortalOutlet = /** @class */ (function (_super) {
    __extends(CdkPortalOutlet, _super);
    function CdkPortalOutlet(_componentFactoryResolver, _viewContainerRef) {
        var _this = _super.call(this) || this;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this._viewContainerRef = _viewContainerRef;
        _this.attached = new EventEmitter();
        /** Whether the portal component is initialized. */
        _this._isInitialized = false;
        return _this;
    }
    Object.defineProperty(CdkPortalOutlet.prototype, "portal", {
        /** Portal associated with the Portal outlet. */
        get: function () {
            return this._attachedPortal;
        },
        set: function (portal) {
            // Ignore the cases where the `portal` is set to a falsy value before the lifecycle hooks have
            // run. This handles the cases where the user might do something like `<div cdkPortalOutlet>`
            // and attach a portal programmatically in the parent component. When Angular does the first CD
            // round, it will fire the setter with empty string, causing the user's content to be cleared.
            if (this.hasAttached() && !portal && !this._isInitialized) {
                return;
            }
            if (this.hasAttached()) {
                _super.prototype.detach.call(this);
            }
            if (portal) {
                _super.prototype.attach.call(this, portal);
            }
            this._attachedPortal = portal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkPortalOutlet.prototype, "attachedRef", {
        /** Component or view reference that is attached to the portal. */
        get: function () {
            return this._attachedRef;
        },
        enumerable: true,
        configurable: true
    });
    CdkPortalOutlet.prototype.ngOnInit = function () {
        this._isInitialized = true;
    };
    CdkPortalOutlet.prototype.ngOnDestroy = function () {
        _super.prototype.dispose.call(this);
        this._attachedPortal = null;
        this._attachedRef = null;
    };
    /**
     * Attach the given ComponentPortal to this PortalOutlet using the ComponentFactoryResolver.
     *
     * @param portal Portal to be attached to the portal outlet.
     * @returns Reference to the created component.
     */
    CdkPortalOutlet.prototype.attachComponentPortal = function (portal) {
        portal.setAttachedHost(this);
        // If the portal specifies an origin, use that as the logical location of the component
        // in the application tree. Otherwise use the location of this PortalOutlet.
        var viewContainerRef = portal.viewContainerRef != null ?
            portal.viewContainerRef :
            this._viewContainerRef;
        var componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
        var ref = viewContainerRef.createComponent(componentFactory, viewContainerRef.length, portal.injector || viewContainerRef.parentInjector);
        _super.prototype.setDisposeFn.call(this, function () { return ref.destroy(); });
        this._attachedPortal = portal;
        this._attachedRef = ref;
        this.attached.emit(ref);
        return ref;
    };
    /**
     * Attach the given TemplatePortal to this PortlHost as an embedded View.
     * @param portal Portal to be attached.
     * @returns Reference to the created embedded view.
     */
    CdkPortalOutlet.prototype.attachTemplatePortal = function (portal) {
        var _this = this;
        portal.setAttachedHost(this);
        var viewRef = this._viewContainerRef.createEmbeddedView(portal.templateRef, portal.context);
        _super.prototype.setDisposeFn.call(this, function () { return _this._viewContainerRef.clear(); });
        this._attachedPortal = portal;
        this._attachedRef = viewRef;
        this.attached.emit(viewRef);
        return viewRef;
    };
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CdkPortalOutlet.prototype, "attached", void 0);
    CdkPortalOutlet = __decorate([
        Directive({
            selector: '[cdkPortalOutlet], [cdkPortalHost], [portalHost]',
            exportAs: 'cdkPortalOutlet, cdkPortalHost',
            inputs: ['portal: cdkPortalOutlet']
        }),
        __metadata("design:paramtypes", [ComponentFactoryResolver,
            ViewContainerRef])
    ], CdkPortalOutlet);
    return CdkPortalOutlet;
}(BasePortalOutlet));
var PortalModule = /** @class */ (function () {
    function PortalModule() {
    }
    PortalModule = __decorate([
        NgModule({
            exports: [CdkPortal, CdkPortalOutlet],
            declarations: [CdkPortal, CdkPortalOutlet]
        })
    ], PortalModule);
    return PortalModule;
}());

/**
 * Custom injector to be used when providing custom
 * injection tokens to components inside a portal.
 * @docs-private
 */
var PortalInjector = /** @class */ (function () {
    function PortalInjector(_parentInjector, _customTokens) {
        this._parentInjector = _parentInjector;
        this._customTokens = _customTokens;
    }
    PortalInjector.prototype.get = function (token, notFoundValue) {
        var value = this._customTokens.get(token);
        if (value !== 'undefined') {
            return value;
        }
        return this._parentInjector.get(token, notFoundValue);
    };
    return PortalInjector;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { DomPortalOutlet as DomPortalHost, CdkPortalOutlet as PortalHostDirective, CdkPortal as TemplatePortalDirective, BasePortalOutlet as BasePortalHost, Portal, ComponentPortal, TemplatePortal, BasePortalOutlet, DomPortalOutlet, CdkPortal, CdkPortalOutlet, PortalModule, PortalInjector };
//# sourceMappingURL=portal.es5.js.map
