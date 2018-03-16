var obj = {
	array: [],
	get highest() {
		if(this.array.length === 0){
			return undefined
		}

		return this.array.sort(function(index, val){
			return index - val 
		})[this.array.length - 1];
	},
	get lowest(){
		if(this.array.length === 0){
			return undefined
		}

		return this.array.sort(function(index, val){
			return val - index  
		})[this.array.length - 1];
	},
	set arrayEqualTo(param){
		this.array = param;
	}
}

/* GET THE HIGHEST AND LOWEST VALUE INSIDE obj.array USING obj.highest and obj.lowest */

obj.arrayEqualTo = [123,44,8888,423,1766,99,23]; //set array values. numbers only
var high = obj.highest; // get highest value
var low = obj.lowest; // get lowest value
console.log('high is %s', high);
console.log('low is %s', low);


/* USING CLASS */ 
class Num {
	constructor(array){
		this.array = array;
	}
	get highest() {
		if(this.array.length === 0){
			return undefined
		}

		return this.array.sort(function(index, val){
			return index - val 
		})[this.array.length - 1];
	}
	get lowest(){
		if(this.array.length === 0){
			return undefined
		}

		return this.array.sort(function(index, val){
			return val - index  
		})[this.array.length - 1];
	}
	set arrayEqualTo(param){
		this.array = param;
	}
}

var Num = new Num([2,3245,1234,99999,34534,2353,1]); // create new Num class
var highNum = Num.highest;
var lowNum = Num.lowest;
Num.arrayEqualTo = [4,432,234,99999345,345,23423]; // set new values inside array