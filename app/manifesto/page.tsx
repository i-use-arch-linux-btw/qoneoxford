import { manifestoSections } from "@/content/manifesto";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const metadata = {
  title: "Manifesto | #OneOxford",
  description: "What David stands for — the #OneOxford SU platform.",
};

export default function ManifestoPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground">Manifesto</h1>
      <p className="mt-2 text-muted-foreground">What I stand for — the #OneOxford SU.</p>

      <div className="mt-8 space-y-8">
        <section>
          <p className="leading-relaxed text-foreground">{manifestoSections.vision}</p>
        </section>
        <section>
          <p className="leading-relaxed text-foreground">{manifestoSections.suAsHub}</p>
          <div className="mt-6 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <h2 className="text-lg font-semibold">{manifestoSections.practicalSupport.title}</h2>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{manifestoSections.practicalSupport.body}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <h2 className="text-lg font-semibold">{manifestoSections.misconduct.title}</h2>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{manifestoSections.misconduct.body}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <h2 className="text-lg font-semibold">{manifestoSections.connectivity.title}</h2>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{manifestoSections.connectivity.body}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <h2 className="text-lg font-semibold">{manifestoSections.aiAndCareers.title}</h2>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{manifestoSections.aiAndCareers.body}</p>
              </CardContent>
            </Card>
          </div>
        </section>
        <section>
          <p className="leading-relaxed text-foreground">{manifestoSections.delivery}</p>
        </section>
      </div>
    </div>
  );
}
