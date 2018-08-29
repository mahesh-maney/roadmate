export class Page<T>{
	public content: Array<T>;
	public totalElements: number;
  public totalPages: number;
  public last: boolean;
  public size: number;
  public number: number;
  public first: boolean;
  public numberOfElements: number;
	constructor(content: Array<T>, 
		totalElements: number,
		totalPages: number,
		last: boolean,
		size: number,
		number: number,
		first:boolean,
		numberOfElements: number){
		this.content = content;
		this.totalElements = totalElements;
		this.totalPages = totalPages;
		this.last = last;
		this.size = size;
		this.number = number;
		this.first = first;
		this.numberOfElements = numberOfElements;
	}
}