declare module "solr" {

    interface SolrClientConfiguration {

    }

    interface SolrQueryOptions {

        start? : number;

        rows? : number;

    }

    interface SolrQueryCallback {

        (err : Error, response : string) : void;

    }

    interface SolrClient {

        query(query : string, cb : SolrQueryCallback);

        query(query : string, options : SolrQueryOptions, cb : SolrQueryCallback);

    }

    interface SolrQueryResponse {

        responseHeader : {

            status : number;

            QTime : number;

            params : {

                q : string;

                wt : string;

            }

        }

        response: {

            numFound : number;

            start : number;

            docs : any[];

        }

        facet_counts? : {

            facet_queries : any;

            facet_fields : any;

            facet_dates : any;

            facet_ranges : any;

            facet_intervals : any;

            facet_heatmaps : any;

        }

    }

    interface SuggestionResponse {

        responseHeader : {

            status : number;

            QTime : number;

            params : {

                'spellcheck.q' : string;

                wt : string;

            }

        }

        spellcheck : {

            suggestions : {

                numFound : number;
                startOffset : number;
                endOffset : number;
                suggestion: string[];

            }[];

        }

    }

    export function createClient(configuration? : SolrClientConfiguration) : SolrClient;

}