import { Injectable } from '@angular/core';
import { defineOneEntry } from 'oneentry';
import { Link } from '../types/link.type';

const ONEENTRY_URL = 'https://linktree-jadeilton.oneentry.cloud';
const ONEENTRY_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYW5ndWxhci1mcm9udC1saW5rdHJlZS1qYWRlaWx0b24iLCJzZXJpYWxOdW1iZXIiOjEsImlhdCI6MTc1NjIxMTMyOSwiZXhwIjoxNzg3NzQ3MjYxfQ.yWNF_Oxp7Dgkt0ShQH-I6FxPMaeYO_A-pKV5HznixOo';


let { Pages} = defineOneEntry(
  ONEENTRY_URL,{
    token: ONEENTRY_TOKEN,
    langCode: 'en_US'
  }
);
@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor() { }



  async getLinks(): Promise<Link[]>{
    try{
      let pages = await Pages.getPages();
      return pages.map((page: any) => {
        const pageExistOutside= page.attributeValeus?.['pages-exists-outside']?.value || false;
        let extractedUrl = page.pageUrl;
        if(pageExistOutside ){const urlFormatted = page.localizeInfos?.['htmlContent']?.replace(/^<p>|<\/p>$/g, '') || '';
        const extractedUrl = urlFormatted.match(/https?:\/\/[^\s"<>]+/)[0];}


        return {
          title: page.localizeInfos?.['title'] || '',
          isVisible: page.isVisible || true,

          url: extractedUrl,
          isExternal: pageExistOutside
        }
    })
    }catch(error){
      console.log("Erro ao buscar links:", error);
        return [];
     }


}
}
