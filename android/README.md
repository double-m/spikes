## My First Android App

Reference:

[http://developer.android.com/training/basics/firstapp/index.html](<http://developer.android.com/training/basics/firstapp/index.html>)

### Which Environment

Which environment? Three possibilities:

1. ADT Bundle (Eclipse + ADT plugin),
2. Android Studio (IntelliJ IDEA + plugin - early access preview at June 2014),
3. other IDEs + Android SDK (e.g. Netbeans + NBAndroid).

Let's choose the first (for now): *ADT Bundle*, then we'll make some tests.

I'm using a laptop with a Debian GNU/Linux as o.s. (here simply called *Linux box* ).

### Which Target

I have:

- Samsung Galaxy Tab2 7.0, o.s. Android 4.2.2,
- Wiko Izzy, o.s. Android 4.2.2

so I installed the SDK platform and build target for *Android 4.2.2 (rev. 17)* (selecting *Window -> Android SDK Manager* in Eclipse with ADT or typing `/opt/adt-bundle/sdk/tools/android sdk` in the system shell). See it in the shell:

```
/opt/adt-bundle/sdk/tools/android list targets
```

The [SDK manager guide](<http://developer.android.com/tools/help/sdk-manager.html>) recommends to install the latest and the first (at the moment, the latest is 4.4.2 (rev. 19); as the first, it indicates 2.2). Question: what about in beetween targets? Let's see later.

### ENV and PATH

```
user@linuxbox:~$ cat .profile
[...] 
export ANDROID_HOME=/opt/adt-bundle/sdk

ADT_TOOLS="$ANDROID_HOME/tools"
[ -d "${ADT_TOOLS}" ] && PATH="$PATH:$ADT_TOOLS"

ADT_PLATFORM_TOOLS="$ANDROID_HOME/platform-tools"
[ -d "${ADT_PLATFORM_TOOLS}" ] && PATH="$PATH:$ADT_PLATFORM_TOOLS"
[...] 
```

Now, the commands seen in the previous section become accessible without path:

```
user@linuxbox:~$ android sdk
user@linuxbox:~$ android list targets
```

and the exported directory is necessary for other services (e.g. Maven).

### Creating the App

Created *MyFirstAppEclipse* using Eclipse menu.

Created *MyFirstAppSdk* using the shell:

```
/opt/adt-bundle/sdk/tools/android create project --target android-19 --name MyFirstAppSdk --path /path/to/workspace/MyFirstAppSdk --activity MainActivity --package com.marcellomessori.myfirstappsdk
```

The second is lighter:

```
user@linuxbox:/path/to/workspace$ du -hs MyFirstApp*
912K    MyFirstAppEclipse
132K    MyFirstAppSdk
```

### Version control for Android Apps using Git

```
user@linuxbox:/path/to/workspace$ wget -O - http://www.gitignore.io/api/android > .gitignore
```

This is true for the SDK generated project, not for ADT Bundle's generated projects, that have `.metadata`, a reference to `appcompat_v7` and a 640KB library on `/libs`. Must find a suitable app template (Maven?).

### Deploying the app

Some troubles here. In a nutshell, we need to:

1. Set the device in *development mode* and connect it to the Linux box via USB (handshake).
2. Compile via shell using `ant debug install` (or *run* in Eclipse with ADT).
3. Deploy via shell using `adb debug install` (or *run* in Eclipse with ADT).

After setting the *development mode*, the *Developer options -> USB debugging* and *Security -> Unknown sources* where also set.

1. Trouble #1: the smartphone remains unknown to the Linux box (the tablet, instead, asked me a confirmation and the association was done).
2. Trouble #2: the deploy worked from the shell, but not from Eclipse.
3. Trouble #3: Eclipse gives me the `Path for project must have only one segment` error.
4. Trouble #4: Eclipse gives me a NullPointerException after creating a new project.

Tentatives for Trouble #1:

- `adb kill-server && adb start-server` on the Linux box;
- turn *Developer options -> USB debugging* off/on on the device;

Solution for Trouble #1: new rule for udev (needed by some devices, maybe by HTC's and not by Samsung's)

- get the vendor code using `lsusb` (for my smartphone was `0bb4`),
- `root@linuxbox:~# echo 'SUBSYSTEM=="usb", ATTR{idVendor}=="0bb4", MODE="0666", GROUP="plugdev"' > /etc/udev/rules.d/99-adb.rules && /etc/init.d/udev restart`,
- disconnect and reconnect device (unplugging the USB).

Solution for Trouble #2: installed the latest ADT Bundle;

- no need to download again the packages from Android SDK Manager: copying them by hand, it works (`adt-bundle/sdk/system-images` and `adt-bundle/sdk/build-tools`);
- new version uses [Support Library Setup](<https://developer.android.com/tools/support-library/setup.html#using-apis>): what about `.gitignore`?

Solution for Trouble #3: go to `Project -> Properties -> Run/Debug Settings:` and delete `Launching New_configuration`.

Solution for Trouble #4: deleted the project, restarted the IDE and recreated the project.

Now I can debug using Eclipse or Ant; Ant can only deploy a debug APK or a signed release APK (not an unsigned release: `INSTALL_PARSE_FAILED_NO_CERTIFICATES`).

### USB tethering and USB deployment on the same device

Good news: can do USB deployment while keeping USB tethering active from the same device.

### Followed the tutorial

[Building a Simple User Interface](<http://developer.android.com/training/basics/firstapp/building-ui.html>)

### Ant based SDK generated project on ADT Bundle (Eclipse)

- Can do debug.
- Can follow easily the tutorial about resources.
- Deploy a lighter version of the app (50KB instead of 2MB).
- When Eclipse imports the existing code, adds three hidden directories.
- At compile time, Eclipse gives a warning: the manifest lacks of `<uses-sdk />` and `<application android:allowBackup="true" ... />` (added by hand).

Also: project succesfully refactored and run with different API specification.

Conclusion: except for the adjustments by hand, the SDK creation script seems a good starting point.

### Maven generated project

References:

- [books.sonatype.com](<http://books.sonatype.com/mvnref-book/reference/android-dev.html>)

For an opensource project, the artifact available in Maven Central would suffice; let's see how to prepare an environment to be able to use "newer versions of the platform as well as the compatibility package and proprietary extensions like the Google Maps support": this must be downloaded and installed in another Maven repo (e.g. the local repo). 

Prerequisites:

- Maven 3.1.1+ (see [here](<http://www.karlmonaghan.com/2013/03/28/eclipse-adt-maven-m2e-android-connector-setup>))
- exported Android SDK directory (see above)
- Google APIs and GDK add-ons for Android 4.4.2 (API 19), downloded using the Android SDK Manager

Preparation of the local Maven repository:

```
wget https://github.com/mosabua/maven-android-sdk-deployer/archive/master.zip
unzip master.zip
cd maven-android-sdk-deployer-master
mvn clean install -P 4.4
```

Check:

Downloaded [samples](<https://github.com/jayway/maven-android-plugin-samples>), unarchived and changed to `helloflashlight` project; set version 19 in `pom.xml`, at `plugins.plugin.configuration.sdk.platform` then:

```
mvn clean install android:deploy android:run
```

Usage:

```
mvn archetype:generate \
-DarchetypeArtifactId=android-quickstart \
-DarchetypeGroupId=de.akquinet.android.archetypes \
-DarchetypeVersion=1.0.11 \
-DarchetypeRepository=~/.m2/repository \
-DgroupId=com.marcellomessori \
-DartifactId=my-android-application \
-Dplatform=19 \
-Dandroid-plugin-version=3.8.2 \
-Dversion=1.0 \
-DinteractiveMode=false
# the following editing is not needed for platform<=16
sed -i 's/<platform.version>/<platform.version>4.1.1.4/' my-android-application/pom.xml
cd my-android-application
mvn clean install android:deploy android:run
# enjoy it on the device :)
mvn android:undeploy
```

See [stand.spree.de](<http://stand.spree.de/wiki_details_maven_archetypes>) for other archetypes.

### Maven generated project in Netbeans

Let's open the newly created project in Netbeans 8.0:

- since Maven is fully supported, Netbeans can open the project without any furter editing (we just need to execute `mvn install`, or the IDE will complain about the lack or the `R` class);
- despite the installed *NBandroid* plugin, the Maven project is not recognized as an Android project, so
  - the *Projects* window is useless (it can't show the `res` folder, then *Files* should be used instead) and,
  - in order to deploy, a custom goal must be defined;
- the graphical layout editor is not available; what's worst, the layout preview neither: they need the *NBandroid extra* plugin (for a fee of 15 EUR).

Just to mention, unrelated to Maven, there's CodenameOne plugin for Netbeans: one plugin to generate native code for Android, IOS, etc., free for the first 100 builds; generation's been done server side after registration.

Awright, Netbeans, you lose. Let's try with Eclipse.

### Maven generated project in Eclipse

Let's install the *M2E* plugin and the *Android M2E* integration plugin. We don't need the MarketPlace Client for Eclise: in ADT Bundle, just *Help -> Install New Software... -> Work with:* `http://download.eclipse.org/technology/m2e/releases` and select:

- m2e - Maven integration for Eclipse,

then let's do the same with `http://rgladwell.github.com/m2e-android/updates/` and select

- Android for Maven Eclipse.

We don't need any `mvn eclipse:eclipse`: just generate a project as above and import it in ADT Bunble (the `.project` will be created correctly). An error will be given in about the `pom.xml` for [these](<http://stackoverflow.com/questions/21016211/error-in-maven-pom-xml-file>) reasons: let's just ignore it.

In case of editing of the `pom.xml` file outside Eclipse:

- `F5` over the project tree updates the properties and so the Maven libraries;
- *Project* -> *Clean...* updates the code completion and suggestions.

If we want to build the app from in the ADT Bundle, a *Run configuration* can be configured using the same goals we'd specify to the shell command `mvn`. It is also possible to debug the application from ADT Bundle: if `<debug>true</debug>` is present in the `pom.xml`, just open ADT Bundle in debug mode and run the application using `mvn ... android:run`.

Upgrading the ADT Bundle is a complex operation.

### Following the tutorial

[Starting Another Activity](<http://developer.android.com/training/basics/firstapp/starting-activity.html>)

Everithing works if the new activity class extend from  `Activity`; No
way using `ActionBarActivity` with Maven (it works in a ADT project).

`ActionBarActivity` is a class contained in the library `appcompat-v7`.
Since this library is not available in the Maven Central Repository, we
need to install it in the local repository. First of all, we have to
download the *Android Support Repository*:

- in *Android SDK Manager*, select and install *Android Support Repository*: note that the new directory `$ANDROID_HOME/extras/android/m2repository` has been created;

Then we have two possibilities:

- we can use the libraries where they have been downloaded, adding a
  `<repository>` tag to the application `pom.xml`;
- we can duplicate them into the local `~/.m2/repository`.

In any case, also trying both with the `jar` and the `aar`, Maven
installes the library into the `apk` and Eclipse reads it for the
auto-completion service, but the app crashes when the class
`ActionBarActivity` is instatiated.

Maven works fine with other libraries and `appcompat-v7` is correctly
used in an ADT project: for now, let's go on without `appcompat-v7`.

### Following the tutorial

[Adding the Action Bar](<http://developer.android.com/training/basics/actionbar/index.html>) done.

[Supporting Different Devices](<http://developer.android.com/training/basics/supporting-devices/index.html>) done.

[Notifying the User](<https://developer.android.com/training/notify-user/index.html>) done.

[Managing the Activity Lifecycle](<http://developer.android.com/training/basics/activity-lifecycle/index.html>) done.

### Changed from Maven to Gradle

If more than one device is attached, here's how to specify which device to deploy to:

```
user@linuxbox:/path/to/myapp$ adb devices
List of devices attached 
xxxxxxxxxxxxxx device
yyyyyyyyyyyyyy device

user@linuxbox:/path/to/myapp$ export ANDROID_SERIAL=xxxxxxxxxxxxxx
user@linuxbox:/path/to/myapp$ ./gradlew installDebug
```

[Building a Dynamic UI with Fragments](<http://developer.android.com/training/basics/fragments/index.html>) *TODO*.

