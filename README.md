# Poorna's Kitchen app

Table booking, table orders, kitchen board, final bills with GST, customers, stock & suppliers,
expenses, monthly profit & loss and a sales dashboard. It runs on Android and iPhone/iPad
phones and tablets, and on Windows and Mac laptops. Every device stays in sync live.

## What's in this folder

| Folder / file | What it is |
|---|---|
| `public/` | The app itself (installable web app). `public/firebase-config.js` is the only file you must edit. |
| `firestore.rules` | Security rules for your database (who can see what). |
| `desktop/` | Mac `.app` and Windows `.exe` wrapper. |
| `android-app/` | Android `.apk` wrapper. |
| `.github/workflows/build-apps.yml` | Builds the website, the APK and the desktop apps on GitHub's free servers. |
| `app-settings.json` | Optional: the web link the desktop app opens (filled in automatically). |

Until you connect Firebase, the app runs in **demo mode**: it works fully but data stays on each device.

---

## Step 1: Create your free database (about 10 minutes)

1. Go to **console.firebase.google.com**, sign in with your Google account, then click **Create a project**.
   Name it `poornas-kitchen`. You can turn Google Analytics off.
2. **Build → Authentication → Get started → Email/Password → Enable → Save.**
3. **Build → Firestore Database → Create database.** Choose location **asia-south1 (Mumbai)** and **production mode**.
4. In Firestore, open the **Rules** tab. Replace everything with the contents of `firestore.rules`, and change
   `OWNER_EMAIL` to **your** login email in lowercase (e.g. `abhay@gmail.com`). Click **Publish**.
5. Click **⚙ Project settings**. Under **Your apps**, click the **Web** icon `</>` and register the app
   as "Poorna's Kitchen". You don't need Firebase Hosting. Copy the `firebaseConfig = { … }` block it shows.
6. Open `public/firebase-config.js` and paste the config into `window.PK_FIREBASE = { … };`.
   Then put your email in `window.PK_OWNER_EMAIL = "…";`.

## Step 2: Put it online and build the apps (GitHub, free)

1. Create a free account at **github.com**, then **New repository**. Name it `poornas-kitchen` and make it **Public**
   (GitHub Pages is free for public repositories; your restaurant data lives in Firebase, not on GitHub).
2. On the new repository page, click **uploading an existing file** and drag in **everything inside this folder**,
   including the hidden `.github` folder. To see hidden folders on a Mac, press `Cmd + Shift + .`; on Windows, turn on
   View → Hidden items. Click **Commit changes**.
   *If `.github` didn't upload:* click **Add file → Create new file**, type the name
   `.github/workflows/build-apps.yml`, paste in the contents of that file and commit.
3. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
4. **Actions** tab → **Build apps** → **Run workflow**. It takes about 10 minutes.
5. When it finishes (green tick), open the run. The downloads are under **Artifacts**:
   - `Poornas-Kitchen-Android`: contains `PoornasKitchen.apk`
   - `Poornas-Kitchen-Mac`: `.dmg` (and `.zip`) containing **Poorna's Kitchen.app**
   - `Poornas-Kitchen-Windows`: installer `.exe` and a portable `.exe`
   - The **website** job shows your app link, like `https://yourname.github.io/poornas-kitchen/`.
6. In Firebase: **Authentication → Settings → Authorized domains → Add domain →** `yourname.github.io`.

From now on, every change you commit to the repository rebuilds everything automatically.

## Step 3: Install on each device

| Device | How |
|---|---|
| **Android phone / tablet** | Open your app link in Chrome → ⋮ menu → **Install app**. Or copy `PoornasKitchen.apk` to the device, open it and allow "Install unknown apps". |
| **iPhone / iPad** | Open your app link in **Safari** → Share → **Add to Home Screen**. |
| **Windows laptop** | Run the installer `.exe`. If SmartScreen appears, click **More info → Run anyway**. Or open the link in Chrome/Edge and click the install icon in the address bar. |
| **Mac** | Open the `.dmg` and drag **Poorna's Kitchen** to Applications. The first time, **right-click → Open** (the app isn't signed by Apple). Or open the link in Chrome and click **Install**. |

## Step 4: First sign-in and your team

1. On any device, tap **First time here? Create login** and use the owner email from Step 1. You're signed in as **owner**.
2. **Manage → Team** → add each staff member's email as **Staff** (bookings, orders, kitchen, billing)
   or **Manager** (also stock, expenses, P&L and the dashboard). They then use **Create login** with that email.
3. Optional: **Manage → Dashboard → Load 3 weeks of example data** to explore. Remove it any time with
   **Staff → Remove example data**.

## Everyday use

- **Order**: pick the table, enter the customer's name and mobile, and add dishes. The order appears in the kitchen straight away.
- **Staff → Kitchen**: move orders from New to Cooking, Ready and Served.
- **Staff → Billing**: **Make final bill** combines the table's orders, then adds discount, GST and round-off. Choose Cash, UPI or Card, then **Mark paid**. **Copy bill** gives text to send on WhatsApp.
- **Manage → Stock & suppliers**: **+ In** records a delivery (stock and supplier dues update), **− Out** records kitchen use or wastage. The reorder list gives a ready WhatsApp message for each supplier.
- **Manage → Expenses**: rent, salaries, electricity, gas and so on.
- **Manage → Profit & loss**: month-to-date statement against last month, plus the day your costs were covered.
- **Manage → Dashboard**: best sellers by plates sold and by money earned, menu performance (Stars, Crowd favourites,
  Premium picks, Slow movers), busy hours, best weekdays, payment mix and top customers.

## Changing things

Edit `public/index.html` on GitHub (pencil icon). Near the top of the script are:
- `CONFIG`: phone number, GST % (set `gstPercent: 0` if you're not GST-registered), GSTIN, opening hours, booking length.
- `TABLES`: your tables and seats.
- `MENU`: dishes and prices.

Commit, and everything rebuilds. The web app and the desktop app pick up changes the next time they're opened.
The Android APK has the app built in, so reinstall the new APK after changes.

## Good to know

- **Free limits:** Firebase's free plan allows 50,000 reads and 20,000 writes a day, which is plenty for one restaurant.
  To stay well inside it, each device loads bills, purchases and expenses for the **current and previous month**, plus the last 30 days of bookings.
- **Offline:** the app opens without internet, and changes made offline sync when the connection returns.
- **Customers booking or ordering from their own phones** (for example a QR code on each table) would need a public page with its own safety rules. That's a good next step if you want it.
- **Play Store / App Store:** the APK here is for installing directly. Publishing to the stores needs developer accounts
  (Google ₹2,000 one-time; Apple $99/year) and signed builds.
