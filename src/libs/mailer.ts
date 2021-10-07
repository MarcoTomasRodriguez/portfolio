export type EmailInformation = {
  name: string;
  email: string;
  message: string;
};

export async function sendEmail({
  name,
  email,
  message,
}: EmailInformation): Promise<void> {
  const response = await fetch("https://formspree.io/f/myybqbdp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, _replyto: email, message }),
  });

  if (!response.ok) {
    throw new Error();
  }
}
