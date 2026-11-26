import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function QrDialog() {
  const [url, setUrl] = useState("");
  const { t } = useI18n();
  useEffect(() => { setUrl(window.location.origin + "/"); }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1.5 rounded-full">
          <QrCode className="h-4 w-4" />
          <span className="hidden sm:inline">QR</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{t("qrTitle")}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="rounded-2xl bg-white p-5 shadow-soft">
            {url && <QRCodeSVG value={url} size={220} level="M" />}
          </div>
          <p className="text-sm text-muted-foreground text-center break-all">{url}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
