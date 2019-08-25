# NgxNotifyLite

[![npm (scoped)](https://img.shields.io/npm/v/@zeeko/notify-lite)](https://www.npmjs.com/package/@zeeko/notify-lite)
[![CircleCI](https://circleci.com/gh/ZeekoZhu/ngx-notify-lite/tree/master.svg?style=svg)](https://circleci.com/gh/ZeekoZhu/ngx-notify-lite/tree/master)
[![codecov](https://codecov.io/gh/ZeekoZhu/ngx-notify-lite/branch/master/graph/badge.svg)](https://codecov.io/gh/ZeekoZhu/ngx-notify-lite) 


A configurable notification system for angular. 

## Install

```
yarn add @zeeko/notify-lite
```

## Use

### Import `NotifyLiteModule`

```typescript
@NgModule({
    imports: [
        NotifyLiteModule.forRoot(),
    ],
})
export class AppModule {
}
```


### Import style

Add predefined `style.less` to your app's global scope.

```
// angular.json
{
    "styles": [
        "./node_modules/@zeeko/notify-lite/style.less"
    ]
}
```

Or import it to your `style`:

```
// style.less
@import "./node_modules/@zeeko/notify-lite/style.less"
```

### Send a notification

```typescript
const data: NotificationData =
        {
            autoDismiss: false,
            message: 'Hello world',
            pauseOnHover: true,
            autoDismissTimeout: 10000,
            type: 'success'
        };

class MyComponent {
    constructor(private notifyCenter: NotifyCenterService) {}
    notify() {
        this.notifyCenter.show(data);
    }
}
```

## Configuration

### NotificationData

```typescript
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface NotificationData {
    message: string;
    type: NotificationType;
    autoDismiss: boolean;
    pauseOnHover: boolean;
    autoDismissTimeout: number;
    extraData?: any;
}
```

* `NotificationData` contains common properties used to create a notification.
* `extraData` is used to store additional data for custom notification template.


### NotificationConfig

```typescript
export declare const useComponentTemplate = <T extends NotificationTemplate>(compType: ComponentType<T>) => ComponentPortalFactory<T>

export interface NotificationConfig {
    portalFactory: ComponentPortalFactory<NotificationTemplate>;
}
```

* **useComponentTemplate**: a helper function to create a `ComponentFactory` from a component class.
* **portalFactory**: a factory that creates ComponentPortal to render `NotificationData`.

### NotificationTemplate Interface

You can replace the default notification template with your own component.

#### Create a component implements NotificationTemplate

```typescript
export class AwesomeComponent implements NotificationTemplate {
    // Add your implementation here...
}
```

#### Override global config

Use `NotifyLiteModule.forRoot` to override global configuration. 

```typescript
@NgModule({
    imports: [
        NotifyLiteModule.forRoot({
            protalFactory: useComponentTemplate(AwesomeComponent)
        }),
    ],
})
export class AppModule {
}
```

#### Override config of a new notification

Or just pass a custom config to `NotifyCenterService.show(data, config)` to override the config of the new notification.

```typescript
const config: NotificationConfig = {
    portalFactory: useComponentTemplate(ActionTemplateComponent)
};
this.notifyCenter.show(data, config);
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `yarn build` to build the project. The build artifacts will be stored in the `dist/` directory.
