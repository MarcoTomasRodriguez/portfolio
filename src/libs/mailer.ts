export function sendEmail(): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) resolve();
      else reject();
    }, Math.random() * 2000);
  });
}
