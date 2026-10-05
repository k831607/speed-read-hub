import { Link } from 'react-router-dom';
import { AudioLines } from 'lucide-react';
export function Brand() {
  return <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="Video Speed Reader home"><span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground"><AudioLines className="size-5" /></span><span className="text-sm font-semibold leading-tight sm:text-base">Video Speed <span className="block sm:inline">Reader</span></span></Link>;
}
