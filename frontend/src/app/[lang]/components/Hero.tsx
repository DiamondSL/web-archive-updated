'use client'
import { getStrapiMedia } from "../utils/api-helpers";
import ContainerDiv from "@/app/[lang]/components/Container";
import {parseHTMLhelper} from "@/app/helpers/parseHTML/parseHTMLhelper";
import {Typography, useTheme} from "@mui/material";

interface Button {
  id: string;
  url: string;
  text: string;
  type: string;
  newTab: boolean;
}

interface Picture {
  data: {
    id: string;
    attributes: {
      url: string;
      name: string;
      alternativeText: string;
    };
  };
}

interface HeroProps {
  data: {
    id: string;
    title: string;
    description: string;
    picture: Picture;
    buttons: Button[];
  };
}

export default function Hero({ data }: HeroProps) {
  const imgUrl = getStrapiMedia(data.picture.data.attributes.url)
  const theme = useTheme()
  const parsedDescription = parseHTMLhelper(data.description)

  return (
      <ContainerDiv styles={{
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(0)
      }}>
        <Typography variant={'h1'}>{data.title}</Typography>
        {parsedDescription}
      </ContainerDiv>
  )
}
