"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {AppBar, ListItem, useTheme} from "@mui/material";
import {tint} from "@/app/helpers/tint/tint";

interface NavLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
}

function NavLink({ url, text }: NavLink) {
  const path = usePathname();

  return (
      <Link
        href={url}
        className={((path === url) || (path === '/uk' && url === '/') || (path === 'en' && url === '/')) ? 'active' : ''}>
        {text}
      </Link>
  );
}

export default function Navbar({
  links,
}: {
  links: Array<NavLink>;
  logoUrl?: string | null;
  logoText?: string | null;
}) {
  const theme = useTheme();
  return (
      <AppBar style={{
        flexDirection: 'row',
        justifyItems: 'flex-start',
        display: 'flex',
        position: 'sticky',
        margin: 0,
        backgroundColor: theme.palette.common.black,
        borderBottomLeftRadius: theme.shape.borderRadius,
        borderBottomRightRadius: theme.shape.borderRadius
      }}>

        {links.map((item: NavLink) => (
            <ListItem sx={{
              display: 'flex',
              flexDirection: 'row',
              width: 'fit-content',
              padding: '12px',
              listStyle: 'none',
              '& a': {
                fontSize: '16px',
                color: 'var(--textColor)',
                ':hover': {
                  color: tint(-0.4, theme.palette.text.primary)
                }
              },
              '& a.active': {
                color: theme.palette.primary.main,
                ':hover': {
                  color: tint(-0.4, theme.palette.primary.main)
                }
              }
            }} key={item.id}>
              <NavLink {...item} />
            </ListItem>
        ))}
      </AppBar>
  )
}
