class ApiFeatures{
    constructor(query,querystr){
        this.query = query
        this.querystr = querystr
    }

    //for search

    search(){
        const keyword = this.querystr.keyword ? {
            productname:{$regex:this.querystr.keyword,$options: "i"}
        }
        :
        {}

        
        this.query = this.query.find({...keyword})
        return this
    }

    //for filter

    filter(){
        const queryCopy = {...this.querystr}
        const removeFields = ["keyboard","page","limit"]
        removeFields.forEach((key)=>delete queryCopy[key])


        //for ratings and price

        let querystr = JSON.stringify(queryCopy)
        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`)

        if(this.querystr.category){
            this.query = this.query.find({category:this.querystr.category})
        }

        this.query = this.query.find(JSON.parse(querystr))
        return this
    }

    //for pagination

    pagination(resultPerPage){
        const currentPage = Number(this.querystr.page) || 1
        const skip = resultPerPage * (currentPage-1)

        this.query = this.query.limit(resultPerPage).skip(skip)

        return this

    }
}




export default ApiFeatures