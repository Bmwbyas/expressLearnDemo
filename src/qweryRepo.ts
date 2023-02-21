//return custom data from frontend

const videoQueryRepo = {
    getVideos(): VideoOutputModel[] {
        const dbVideos: DbVideosType[] = []
        const authors: DbAuthorType[] = []
        return dbVideos.map(dbVideo => {
            const author = authors.find(a => a._id === dbVideo.authorId)
            return this._mapDBVideoToVideoOuntputModel(dbVideo,author!)

        })
    },
    getVideoById(id:string): VideoOutputModel {
        const dbVideo: DbVideosType = {
            _id:'1',
            title:'blabla',
            authorId:'2',
            isBanned:true,
            banObject:{isBanned:true,banReason:'blabla'}
        }
        const author: DbAuthorType = {
            _id:'2',
            firstName:'as',
            lastName:'bmw'
        }
            return this._mapDBVideoToVideoOuntputModel(dbVideo,author)


    },
    getBannetVideoById(id:string): BannetVideoOutputModel {
        const dbVideo: DbVideosType = {
            _id:'1',
            title:'blabla',
            authorId:'2',
            isBanned:true,
            banObject:{isBanned:true,banReason:'blabla'}
        }
        const author: DbAuthorType = {
            _id:'2',
            firstName:'as',
            lastName:'bmw'
        }
        return this._mapBannedDBVideoToVideoOuntputModel(dbVideo,author)


    },
    getBannetVideos(): BannetVideoOutputModel[] {
        const dbVideos: DbVideosType[] = []
        const authors: DbAuthorType[] = []
        return dbVideos.map(dbVideo => {
            const author = authors.find(a => a._id === dbVideo.authorId)
            return this._mapBannedDBVideoToVideoOuntputModel(dbVideo,author!)

        })
    },
    _mapDBVideoToVideoOuntputModel(dbVideo:DbVideosType,dbAuthor:DbAuthorType){
        return ({
            id: dbVideo._id,
            title: dbVideo.title,
            author: {
                id: dbAuthor!._id,
                name: dbAuthor!.firstName + ' ' + dbAuthor!.lastName
            }
        })
    },
    _mapBannedDBVideoToVideoOuntputModel(dbVideo:DbVideosType,dbAuthor:DbAuthorType):BannetVideoOutputModel{

        return ({
            id: dbVideo._id,
            title: dbVideo.title,
            author: {
                id: dbAuthor!._id,
                name: dbAuthor!.firstName + ' ' + dbAuthor!.lastName
            },
            banReason:dbVideo.banObject!.banReason
        })
    }
}
type BannetVideoOutputModel={
    id: string
    title: string
    author: {
        id: string
        name: string
    }
    banReason:string
}
type VideoOutputModel = {
    id: string
    title: string
    author: {
        id: string
        name: string
    }
}
type DbVideosType = {
    _id: string
    title: string
    authorId: string
    isBanned:boolean
    banObject:null|{
        isBanned:boolean
        banReason:string
    }
}
type DbAuthorType = {
    _id: string
    firstName: string
    lastName: string
}
