import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Rajvi.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-gradient">Get in Touch</h1>
        <p className="text-lg text-muted-foreground">
          Have a question or want to work together? Drop me a message below.
        </p>
      </div>

      <ContactForm />
    </div>
  );
}
