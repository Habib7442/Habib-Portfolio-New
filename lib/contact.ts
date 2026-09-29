// All "contact me" actions open WhatsApp (click-to-chat) with this number.
export const WHATSAPP_NUMBER = "919707370886"; // country code + number, no "+" or spaces

export const WHATSAPP_GREETING = "Hi Habib! I found your portfolio and I'd like to talk about a project.";

/** wa.me link that opens a chat with the number, optionally with a message already typed. */
export function whatsappUrl(text: string = WHATSAPP_GREETING) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
