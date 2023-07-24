export interface Game{
    id:string
    name:string,
    developer:{
        developer:string
    }
    release_date:Date,
    tags: tagItem[]
    description:string,
    image:string,
}

export interface tagItem{
    Tag:{
        tag:string
    }
}