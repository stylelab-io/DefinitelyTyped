declare module "parse-acc-lang" {

    interface ILanguage {

        language : string;

        locale : string;

    }

    export function extractFirstLang(acceptLanguageString : string) : ILanguage;

    export function extractAllLangs(acceptLanguageString : string) : ILanguage[];

}