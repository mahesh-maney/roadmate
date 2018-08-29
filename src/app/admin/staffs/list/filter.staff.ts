import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filterStaff'
})
export class FilterStaffPipe implements PipeTransform {
	constructor(){
		
	}
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
		
		searchText = searchText.toLowerCase();
		return items.filter( it => {
	  		let nameToSearch = it.firstName + ' ' + it.lastName;
      	return nameToSearch.toLowerCase().includes(searchText);
    	});
   }
}