self.addEventListener("install", () => {
  console.log("Service Worker installed");
});

self.addEventListener("activate", () => {
  console.log("Service Worker activated");
});

// 🕒 Daily reminder between 11 AM and 9 PM
function scheduleReminder() {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 11 && hour <= 21) {
    self.registration.showNotification("MilkMeter Reminder", {
      body: "Don't forget to save today's milk entry 🥛",
      icon: "/icon.png"
    });
  }
}

// Check every hour
setInterval(scheduleReminder, 60 * 60 * 1000);
