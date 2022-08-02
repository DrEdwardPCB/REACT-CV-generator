import { StyleSheet, Font } from "@react-pdf/renderer";
import { Style } from '@react-pdf/types';

export type Tag =
    | 'html'
    | 'body'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'div'
    | 'p'
    | 'blockquote'
    | 'article'
    | 'caption'
    | 'form'
    | 'hr'
    | 'br'
    | 'address'
    | 'aside'
    | 'pre'
    | 'span'
    | 'button'
    | 'label'
    | 'b'
    | 'strong'
    | 'q'
    | 'i'
    | 'em'
    | 'u'
    | 's'
    | 'cite'
    | 'dfn'
    | 'code'
    | 'abbr'
    | 'sup'
    | 'sub'
    | 'a'
    | 'img'
    | 'ul'
    | 'ol'
    | 'li'
    | 'dd'
    | 'dl'
    | 'dt'
    | 'fieldset'
    | 'header'
    | 'footer'
    | 'section'
    | 'table'
    | 'tr'
    | 'td'
    | 'th'
    | 'thead'
    | 'tbody';
export type HtmlStyle =
    | (Style & {
        listStyle?: string;
        listStyleType?: string;
        borderSpacing?: number | string;
        borderCollapse?: string;
    })
    | any;

export type HtmlStyles = Record<Tag | string, HtmlStyle>;

export const createHtmlStylesheet = (fontSize: number) => {

    const em = (number: number, relativeSize: number = fontSize) => number * relativeSize;
    const htmlSheet: HtmlStyle = {

        h1: {
            fontSize: em(2),
            marginVertical: em(0.4, em(2)),
            fontFamily: 'Helvetica-Bold',
        },
        h2: {
            fontSize: em(1.5),
            marginVertical: em(0.6, em(1.5)),
            fontFamily: 'Helvetica-Bold',
        },
        h3: {
            fontSize: em(1.17),
            marginVertical: em(0.8, em(1.17)),
            fontFamily: 'Helvetica-Bold',
        },
        h4: {
            fontSize: em(1),
            marginVertical: em(1.1, em(1)),
            fontFamily: 'Helvetica-Bold',
        },
        h5: {
            fontSize: em(0.83),
            marginVertical: em(1.4, em(0.83)),
            fontFamily: 'Helvetica-Bold',
        },
        h6: {
            fontSize: em(0.67),
            marginVertical: em(2.1, em(0.67)),
            fontFamily: 'Helvetica-Bold',
        },
        p: {
            fontSize: em(1),
            marginVertical: em(1),
        },
        blockquote: {
            marginVertical: em(1),
            marginHorizontal: 30,
        },
        hr: {
            marginVertical: em(0.5),
            borderBottomWidth: 1,
            borderBottomColor: '#000',
        },
        address: {
            fontFamily: 'Helvetica-Oblique',
        },
        pre: {
            // fontFamily: 'monospace',
            // whiteSpace: 'pre',
            marginVertical: em(1),
        },
        b: {
            fontFamily: 'Helvetica-Bold',
        },
        strong: {
            fontFamily: 'Times-Bold',
        },
        i: {
            fontFamily: 'Helvetica-Oblique',
        },
        em: {
            fontFamily: 'Times-Italic',
        },
        s: {
            textDecoration: 'line-through',
        },
        u: {
            textDecoration: 'underline',
        },
        cite: {
            fontStyle: 'italic',
        },
        code: {
            // fontFamily: 'monospace',
        },
        a: {
            textDecoration: 'underline',
        },
        ul: {
            marginVertical: em(1),
        },
        ol: {
            marginVertical: em(1),
        },
        li: {
            display: 'flex',
            flexDirection: 'row',
        },
        li_bullet: {
            width: 15,
            textAlign: 'right',
            flexShrink: 0,
            flexGrow: 0,
            paddingRight: 5,
        },
        li_content: {
            textAlign: 'left',
            flexGrow: 1,
        },
        table: {
            display: 'flex',
            flexDirection: 'column',
            // borderColor: 'gray',
            // borderWidth: 1,
            flexShrink: 1,
            borderCollapse: 'collapse',
            // borderSpacing: 2,
        },
        thead: {
            display: 'flex',
            flexDirection: 'column',
        },
        tbody: {
            display: 'flex',
            flexDirection: 'column',
        },
        tr: {
            display: 'flex',
            flexDirection: 'row',
            flexShrink: 1,
        },
        td: {
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: 1,
        },
        th: {
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: 1,
            fontWeight: 'bold',
        },
    };
    return StyleSheet.create(htmlSheet);
}
