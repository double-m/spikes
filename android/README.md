## My First Android App

Reference:

[http://developer.android.com/training/basics/firstapp/index.html](<http://developer.android.com/training/basics/firstapp/index.html>)

### Which Environment

Which environment? Three possibilities:

1. ADT bundle (Eclipse + ADT plugin),
2. Android Studio (IntelliJ IDEA + plugin - early access preview at June 2014),
3. other IDEs + Android SDK (e.g. Netbeans + NBAndroid).

Was chosen the first: *ADT bundle*.

### Which Target

I have:

- Samsung Galaxy Tab2 7.0, o.s. Android 4.2.2,
- Wiko Izzy, o.s. Android 4.2.2

so I installed the SDK platform and build target for *Android 4.2.2  (rev. 17)* (selecting *Window -> Android SDK Manager* in Eclipse with ADT or typing `/opt/adt-bundle/sdk/tools/android sdk` in the system shell). See it in the shell:

```
/opt/adt-bundle/sdk/tools/android list targets
```

The [SDK manager guide](<http://developer.android.com/tools/help/sdk-manager.html>) recommends to install the latest and the first (at the moment, the latest is 4.4.2 (rev. 19); as the first, it indicates 2.2). Question: what about in beetween targets? Let's see later.

### Creating the App

Created *MyFirstAppEclipse* using Eclipse menu.

Created *MyFirstAppSdk* using the shell:

```
/opt/adt-bundle/sdk/tools/android create project --target android-17 --name MyFirstAppSdk --path /path/to/workspace/MyFirstAppSdk --activity MainActivity --package com.marcellomessori.myfirstappsdk
```

The second is lighter:

```
user@linuxbox:/path/to/workspace$ du -hs MyFirstApp*
912K    MyFirstAppEclipse
132K    MyFirstAppSdk
```
