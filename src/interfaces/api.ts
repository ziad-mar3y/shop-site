export interface ApiResponse<T> {
    result:number;
    metadata:{
        currentPage:number;
        numberOfPages:number;
        limit:number;
        nextPage:number
    };
    data: T[];

}