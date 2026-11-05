import { ArrowUp, Github, Linkedin, Twitter, Youtube } from 'lucide-react'
import { footerColumns } from '@/data/navigation'
import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'

const socials = [
  { label: 'Nexus on X', icon: Twitter },
  { label: 'Nexus on GitHub', icon: Github },
  { label: 'Nexus on LinkedIn', icon: Linkedin },
  { label: 'Nexus on YouTube', icon: Youtube },
]

export function Footer() {
  return (
    <footer className="border-t border-line pt-16 pb-10">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2.6fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-body">
              One intelligent workspace for teams that want to build, collaborate, and ship without limits.
            </p>
            <ul className="mt-6 flex gap-2" aria-label="Social media">
              {socials.map(({ label, icon: Icon }) => (
                <li key={label}>
                  <a
                    href="#"
                    aria-label={label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-line text-body transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/60 hover:text-white"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold text-white">{col.title}</h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-sm text-body transition-colors duration-200 hover:text-white">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-muted">© {new Date().getFullYear()} Nexus, Inc. All rights reserved.</p>
          <a href="#top" className="group inline-flex items-center gap-2 text-sm text-body transition-colors hover:text-white">
            Back to top
            <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
          </a>
        </div>
      </Container>
    </footer>
  )
}
