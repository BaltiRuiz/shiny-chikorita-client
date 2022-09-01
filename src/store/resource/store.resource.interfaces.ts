interface IStoreResource {
    data: any;
    message: string | null;
}

export interface IResourceStoreState {
    pokemon: IStoreResource;
    type: IStoreResource;
    move: IStoreResource;
    ability: IStoreResource;
    item: IStoreResource;
    location: IStoreResource;
}
