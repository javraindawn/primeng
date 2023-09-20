export class ObjectUtils {
    static equals(obj1, obj2, field) {
        if (field)
            return this.resolveFieldData(obj1, field) === this.resolveFieldData(obj2, field);
        else
            return this.equalsByValue(obj1, obj2);
    }
    static equalsByValue(obj1, obj2) {
        if (obj1 === obj2)
            return true;
        if (obj1 && obj2 && typeof obj1 == 'object' && typeof obj2 == 'object') {
            var arrA = Array.isArray(obj1), arrB = Array.isArray(obj2), i, length, key;
            if (arrA && arrB) {
                length = obj1.length;
                if (length != obj2.length)
                    return false;
                for (i = length; i-- !== 0;)
                    if (!this.equalsByValue(obj1[i], obj2[i]))
                        return false;
                return true;
            }
            if (arrA != arrB)
                return false;
            var dateA = this.isDate(obj1), dateB = this.isDate(obj2);
            if (dateA != dateB)
                return false;
            if (dateA && dateB)
                return obj1.getTime() == obj2.getTime();
            var regexpA = obj1 instanceof RegExp, regexpB = obj2 instanceof RegExp;
            if (regexpA != regexpB)
                return false;
            if (regexpA && regexpB)
                return obj1.toString() == obj2.toString();
            var keys = Object.keys(obj1);
            length = keys.length;
            if (length !== Object.keys(obj2).length)
                return false;
            for (i = length; i-- !== 0;)
                if (!Object.prototype.hasOwnProperty.call(obj2, keys[i]))
                    return false;
            for (i = length; i-- !== 0;) {
                key = keys[i];
                if (!this.equalsByValue(obj1[key], obj2[key]))
                    return false;
            }
            return true;
        }
        return obj1 !== obj1 && obj2 !== obj2;
    }
    static resolveFieldData(data, field) {
        if (data && field) {
            if (this.isFunction(field)) {
                return field(data);
            }
            else if (field.indexOf('.') == -1) {
                return data[field];
            }
            else {
                let fields = field.split('.');
                let value = data;
                for (let i = 0, len = fields.length; i < len; ++i) {
                    if (value == null) {
                        return null;
                    }
                    value = value[fields[i]];
                }
                return value;
            }
        }
        else {
            return null;
        }
    }
    static isFunction(obj) {
        return !!(obj && obj.constructor && obj.call && obj.apply);
    }
    static reorderArray(value, from, to) {
        let target;
        if (value && from !== to) {
            if (to >= value.length) {
                to %= value.length;
                from %= value.length;
            }
            value.splice(to, 0, value.splice(from, 1)[0]);
        }
    }
    static insertIntoOrderedArray(item, index, arr, sourceArr) {
        if (arr.length > 0) {
            let injected = false;
            for (let i = 0; i < arr.length; i++) {
                let currentItemIndex = this.findIndexInList(arr[i], sourceArr);
                if (currentItemIndex > index) {
                    arr.splice(i, 0, item);
                    injected = true;
                    break;
                }
            }
            if (!injected) {
                arr.push(item);
            }
        }
        else {
            arr.push(item);
        }
    }
    static findIndexInList(item, list) {
        let index = -1;
        if (list) {
            for (let i = 0; i < list.length; i++) {
                if (list[i] == item) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    }
    static contains(value, list) {
        if (value != null && list && list.length) {
            for (let val of list) {
                if (this.equals(value, val))
                    return true;
            }
        }
        return false;
    }
    static removeAccents(str) {
        if (str && str.search(/[\xC0-\xFF]/g) > -1) {
            str = str
                .replace(/[\xC0-\xC5]/g, 'A')
                .replace(/[\xC6]/g, 'AE')
                .replace(/[\xC7]/g, 'C')
                .replace(/[\xC8-\xCB]/g, 'E')
                .replace(/[\xCC-\xCF]/g, 'I')
                .replace(/[\xD0]/g, 'D')
                .replace(/[\xD1]/g, 'N')
                .replace(/[\xD2-\xD6\xD8]/g, 'O')
                .replace(/[\xD9-\xDC]/g, 'U')
                .replace(/[\xDD]/g, 'Y')
                .replace(/[\xDE]/g, 'P')
                .replace(/[\xE0-\xE5]/g, 'a')
                .replace(/[\xE6]/g, 'ae')
                .replace(/[\xE7]/g, 'c')
                .replace(/[\xE8-\xEB]/g, 'e')
                .replace(/[\xEC-\xEF]/g, 'i')
                .replace(/[\xF1]/g, 'n')
                .replace(/[\xF2-\xF6\xF8]/g, 'o')
                .replace(/[\xF9-\xFC]/g, 'u')
                .replace(/[\xFE]/g, 'p')
                .replace(/[\xFD\xFF]/g, 'y');
        }
        return str;
    }
    static isDate(input) {
        return Object.prototype.toString.call(input) === '[object Date]';
    }
    static isEmpty(value) {
        return value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0) || (!this.isDate(value) && typeof value === 'object' && Object.keys(value).length === 0);
    }
    static isNotEmpty(value) {
        return !this.isEmpty(value);
    }
    static compare(value1, value2, locale, order = 1) {
        let result = -1;
        const emptyValue1 = this.isEmpty(value1);
        const emptyValue2 = this.isEmpty(value2);
        if (emptyValue1 && emptyValue2)
            result = 0;
        else if (emptyValue1)
            result = order;
        else if (emptyValue2)
            result = -order;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
            result = value1.localeCompare(value2, locale, { numeric: true });
        else
            result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
        return result;
    }
    static sort(value1, value2, order = 1, locale, nullSortOrder = 1) {
        const result = ObjectUtils.compare(value1, value2, locale, order);
        // nullSortOrder == 1 means Excel like sort nulls at bottom
        const finalSortOrder = nullSortOrder === 1 ? order : nullSortOrder;
        return finalSortOrder * result;
    }
    static merge(obj1, obj2) {
        if (obj1 == undefined && obj2 == undefined) {
            return undefined;
        }
        else if ((obj1 == undefined || typeof obj1 === 'object') && (obj2 == undefined || typeof obj2 === 'object')) {
            return { ...(obj1 || {}), ...(obj2 || {}) };
        }
        else if ((obj1 == undefined || typeof obj1 === 'string') && (obj2 == undefined || typeof obj2 === 'string')) {
            return [obj1 || '', obj2 || ''].join(' ');
        }
        return obj2 || obj1;
    }
    static isPrintableCharacter(char = '') {
        return this.isNotEmpty(char) && char.length === 1 && char.match(/\S| /);
    }
    static getItemValue(obj, ...params) {
        return this.isFunction(obj) ? obj(...params) : obj;
    }
    static findLastIndex(arr, callback) {
        let index = -1;
        if (this.isNotEmpty(arr)) {
            try {
                index = arr.findLastIndex(callback);
            }
            catch {
                index = arr.lastIndexOf([...arr].reverse().find(callback));
            }
        }
        return index;
    }
    static findLast(arr, callback) {
        let item;
        if (this.isNotEmpty(arr)) {
            try {
                item = arr.findLast(callback);
            }
            catch {
                item = [...arr].reverse().find(callback);
            }
        }
        return item;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0dXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvdXRpbHMvb2JqZWN0dXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxPQUFPLFdBQVc7SUFDYixNQUFNLENBQUMsTUFBTSxDQUFDLElBQVMsRUFBRSxJQUFTLEVBQUUsS0FBYztRQUNyRCxJQUFJLEtBQUs7WUFBRSxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQzs7WUFDdkYsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRU0sTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFTLEVBQUUsSUFBUztRQUM1QyxJQUFJLElBQUksS0FBSyxJQUFJO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFFL0IsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLE9BQU8sSUFBSSxJQUFJLFFBQVEsSUFBSSxPQUFPLElBQUksSUFBSSxRQUFRLEVBQUU7WUFDcEUsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFDMUIsSUFBSSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQzFCLENBQUMsRUFDRCxNQUFNLEVBQ04sR0FBRyxDQUFDO1lBRVIsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO2dCQUNkLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUNyQixJQUFJLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTTtvQkFBRSxPQUFPLEtBQUssQ0FBQztnQkFDeEMsS0FBSyxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUM7b0JBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxh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RDtTQUNKO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLFFBQVE7UUFDaEMsSUFBSSxJQUFJLENBQUM7UUFFVCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDdEIsSUFBSTtnQkFDQSxJQUFJLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNqQztZQUFDLE1BQU07Z0JBQ0osSUFBSSxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDNUM7U0FDSjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBPYmplY3RVdGlscyB7XG4gICAgcHVibGljIHN0YXRpYyBlcXVhbHMob2JqMTogYW55LCBvYmoyOiBhbnksIGZpZWxkPzogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChmaWVsZCkgcmV0dXJuIHRoaXMucmVzb2x2ZUZpZWxkRGF0YShvYmoxLCBmaWVsZCkgPT09IHRoaXMucmVzb2x2ZUZpZWxkRGF0YShvYmoyLCBmaWVsZCk7XG4gICAgICAgIGVsc2UgcmV0dXJuIHRoaXMuZXF1YWxzQnlWYWx1ZShvYmoxLCBvYmoyKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGVxdWFsc0J5VmFsdWUob2JqMTogYW55LCBvYmoyOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKG9iajEgPT09IG9iajIpIHJldHVybiB0cnVlO1xuXG4gICAgICAgIGlmIChvYmoxICYmIG9iajIgJiYgdHlwZW9mIG9iajEgPT0gJ29iamVjdCcgJiYgdHlwZW9mIG9iajIgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHZhciBhcnJBID0gQXJyYXkuaXNBcnJheShvYmoxKSxcbiAgICAgICAgICAgICAgICBhcnJCID0gQXJyYXkuaXNBcnJheShvYmoyKSxcbiAgICAgICAgICAgICAgICBpLFxuICAgICAgICAgICAgICAgIGxlbmd0aCxcbiAgICAgICAgICAgICAgICBrZXk7XG5cbiAgICAgICAgICAgIGlmIChhcnJBICYmIGFyckIpIHtcbiAgICAgICAgICAgICAgICBsZW5ndGggPSBvYmoxLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBpZiAobGVuZ3RoICE9IG9iajIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gIT09IDA7ICkgaWYgKCF0aGlzLmVxdWFsc0J5VmFsdWUob2JqMVtpXSwgb2JqMltpXSkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGFyckEgIT0gYXJyQikgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICB2YXIgZGF0ZUEgPSB0aGlzLmlzRGF0ZShvYmoxKSxcbiAgICAgICAgICAgICAgICBkYXRlQiA9IHRoaXMuaXNEYXRlKG9iajIpO1xuICAgICAgICAgICAgaWYgKGRhdGVBICE9IGRhdGVCKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBpZiAoZGF0ZUEgJiYgZGF0ZUIpIHJldHVybiBvYmoxLmdldFRpbWUoKSA9PSBvYmoyLmdldFRpbWUoKTtcblxuICAgICAgICAgICAgdmFyIHJlZ2V4cEEgPSBvYmoxIGluc3RhbmNlb2YgUmVnRXhwLFxuICAgICAgICAgICAgICAgIHJlZ2V4cEIgPSBvYmoyIGluc3RhbmNlb2YgUmVnRXhwO1xuICAgICAgICAgICAgaWYgKHJlZ2V4cEEgIT0gcmVnZXhwQikgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgaWYgKHJlZ2V4cEEgJiYgcmVnZXhwQikgcmV0dXJuIG9iajEudG9TdHJpbmcoKSA9PSBvYmoyLnRvU3RyaW5nKCk7XG5cbiAgICAgICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqMSk7XG4gICAgICAgICAgICBsZW5ndGggPSBrZXlzLmxlbmd0aDtcblxuICAgICAgICAgICAgaWYgKGxlbmd0aCAhPT0gT2JqZWN0LmtleXMob2JqMikubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tICE9PSAwOyApIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iajIsIGtleXNbaV0pKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tICE9PSAwOyApIHtcbiAgICAgICAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5lcXVhbHNCeVZhbHVlKG9iajFba2V5XSwgb2JqMltrZXldKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvYmoxICE9PSBvYmoxICYmIG9iajIgIT09IG9iajI7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyByZXNvbHZlRmllbGREYXRhKGRhdGE6IGFueSwgZmllbGQ6IGFueSk6IGFueSB7XG4gICAgICAgIGlmIChkYXRhICYmIGZpZWxkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0Z1bmN0aW9uKGZpZWxkKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmaWVsZChkYXRhKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZmllbGQuaW5kZXhPZignLicpID09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFbZmllbGRdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgZmllbGRzOiBzdHJpbmdbXSA9IGZpZWxkLnNwbGl0KCcuJyk7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gZGF0YTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gZmllbGRzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlW2ZpZWxkc1tpXV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBpc0Z1bmN0aW9uKG9iajogYW55KSB7XG4gICAgICAgIHJldHVybiAhIShvYmogJiYgb2JqLmNvbnN0cnVjdG9yICYmIG9iai5jYWxsICYmIG9iai5hcHBseSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyByZW9yZGVyQXJyYXkodmFsdWU6IGFueVtdLCBmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IHRhcmdldDogbnVtYmVyO1xuICAgICAgICBpZiAodmFsdWUgJiYgZnJvbSAhPT0gdG8pIHtcbiAgICAgICAgICAgIGlmICh0byA+PSB2YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0byAlPSB2YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZnJvbSAlPSB2YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YWx1ZS5zcGxpY2UodG8sIDAsIHZhbHVlLnNwbGljZShmcm9tLCAxKVswXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGluc2VydEludG9PcmRlcmVkQXJyYXkoaXRlbTogYW55LCBpbmRleDogbnVtYmVyLCBhcnI6IGFueVtdLCBzb3VyY2VBcnI6IGFueVtdKTogdm9pZCB7XG4gICAgICAgIGlmIChhcnIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IGluamVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50SXRlbUluZGV4ID0gdGhpcy5maW5kSW5kZXhJbkxpc3QoYXJyW2ldLCBzb3VyY2VBcnIpO1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50SXRlbUluZGV4ID4gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJyLnNwbGljZShpLCAwLCBpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgaW5qZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghaW5qZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBhcnIucHVzaChpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFyci5wdXNoKGl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBmaW5kSW5kZXhJbkxpc3QoaXRlbTogYW55LCBsaXN0OiBhbnkpOiBudW1iZXIge1xuICAgICAgICBsZXQgaW5kZXg6IG51bWJlciA9IC0xO1xuXG4gICAgICAgIGlmIChsaXN0KSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAobGlzdFtpXSA9PSBpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgY29udGFpbnModmFsdWUsIGxpc3QpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9IG51bGwgJiYgbGlzdCAmJiBsaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgZm9yIChsZXQgdmFsIG9mIGxpc3QpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lcXVhbHModmFsdWUsIHZhbCkpIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcmVtb3ZlQWNjZW50cyhzdHIpIHtcbiAgICAgICAgaWYgKHN0ciAmJiBzdHIuc2VhcmNoKC9bXFx4QzAtXFx4RkZdL2cpID4gLTEpIHtcbiAgICAgICAgICAgIHN0ciA9IHN0clxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9bXFx4QzAtXFx4QzVdL2csICdBJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvW1xceEM2XS9nLCAnQUUnKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9bXFx4QzddL2csICdDJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvW1xceEM4LVxceENCXS9nLCAnRScpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1tcXHhDQy1cXHhDRl0vZywgJ0knKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9bXFx4RDBdL2csICdEJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvW1xceEQxXS9nLCAnTicpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1tcXHhEMi1cXHhENlxceEQ4XS9nLCAnTycpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1tcXHhEOS1cXHhEQ10vZywgJ1UnKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9bXFx4RERdL2csICdZJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvW1xceERFXS9nLCAnUCcpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1tcXHhFMC1cXHhFNV0vZywgJ2EnKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9bXFx4RTZdL2csICdhZScpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1tcXHhFN10vZywgJ2MnKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9bXFx4RTgtXFx4RUJdL2csICdlJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvW1xceEVDLVxceEVGXS9nLCAnaScpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1tcXHhGMV0vZywgJ24nKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9bXFx4RjItXFx4RjZcXHhGOF0vZywgJ28nKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9bXFx4RjktXFx4RkNdL2csICd1JylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvW1xceEZFXS9nLCAncCcpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1tcXHhGRFxceEZGXS9nLCAneScpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGlzRGF0ZShpbnB1dDogYW55KSB7XG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5wdXQpID09PSAnW29iamVjdCBEYXRlXSc7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBpc0VtcHR5KHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSAnJyB8fCAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID09PSAwKSB8fCAoIXRoaXMuaXNEYXRlKHZhbHVlKSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIE9iamVjdC5rZXlzKHZhbHVlKS5sZW5ndGggPT09IDApO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaXNOb3RFbXB0eSh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gIXRoaXMuaXNFbXB0eSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBjb21wYXJlKHZhbHVlMSwgdmFsdWUyLCBsb2NhbGUsIG9yZGVyID0gMSkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gLTE7XG4gICAgICAgIGNvbnN0IGVtcHR5VmFsdWUxID0gdGhpcy5pc0VtcHR5KHZhbHVlMSk7XG4gICAgICAgIGNvbnN0IGVtcHR5VmFsdWUyID0gdGhpcy5pc0VtcHR5KHZhbHVlMik7XG5cbiAgICAgICAgaWYgKGVtcHR5VmFsdWUxICYmIGVtcHR5VmFsdWUyKSByZXN1bHQgPSAwO1xuICAgICAgICBlbHNlIGlmIChlbXB0eVZhbHVlMSkgcmVzdWx0ID0gb3JkZXI7XG4gICAgICAgIGVsc2UgaWYgKGVtcHR5VmFsdWUyKSByZXN1bHQgPSAtb3JkZXI7XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZTEgPT09ICdzdHJpbmcnICYmIHR5cGVvZiB2YWx1ZTIgPT09ICdzdHJpbmcnKSByZXN1bHQgPSB2YWx1ZTEubG9jYWxlQ29tcGFyZSh2YWx1ZTIsIGxvY2FsZSwgeyBudW1lcmljOiB0cnVlIH0pO1xuICAgICAgICBlbHNlIHJlc3VsdCA9IHZhbHVlMSA8IHZhbHVlMiA/IC0xIDogdmFsdWUxID4gdmFsdWUyID8gMSA6IDA7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHNvcnQodmFsdWUxLCB2YWx1ZTIsIG9yZGVyID0gMSwgbG9jYWxlLCBudWxsU29ydE9yZGVyID0gMSkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBPYmplY3RVdGlscy5jb21wYXJlKHZhbHVlMSwgdmFsdWUyLCBsb2NhbGUsIG9yZGVyKTtcbiAgICAgICAgLy8gbnVsbFNvcnRPcmRlciA9PSAxIG1lYW5zIEV4Y2VsIGxpa2Ugc29ydCBudWxscyBhdCBib3R0b21cbiAgICAgICAgY29uc3QgZmluYWxTb3J0T3JkZXIgPSBudWxsU29ydE9yZGVyID09PSAxID8gb3JkZXIgOiBudWxsU29ydE9yZGVyO1xuXG4gICAgICAgIHJldHVybiBmaW5hbFNvcnRPcmRlciAqIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIG1lcmdlKG9iajE/OiBhbnksIG9iajI/OiBhbnkpOiBhbnkge1xuICAgICAgICBpZiAob2JqMSA9PSB1bmRlZmluZWQgJiYgb2JqMiA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH0gZWxzZSBpZiAoKG9iajEgPT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBvYmoxID09PSAnb2JqZWN0JykgJiYgKG9iajIgPT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBvYmoyID09PSAnb2JqZWN0JykpIHtcbiAgICAgICAgICAgIHJldHVybiB7IC4uLihvYmoxIHx8IHt9KSwgLi4uKG9iajIgfHwge30pIH07XG4gICAgICAgIH0gZWxzZSBpZiAoKG9iajEgPT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBvYmoxID09PSAnc3RyaW5nJykgJiYgKG9iajIgPT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBvYmoyID09PSAnc3RyaW5nJykpIHtcbiAgICAgICAgICAgIHJldHVybiBbb2JqMSB8fCAnJywgb2JqMiB8fCAnJ10uam9pbignICcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9iajIgfHwgb2JqMTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGlzUHJpbnRhYmxlQ2hhcmFjdGVyKGNoYXIgPSAnJykge1xuICAgICAgICByZXR1cm4gdGhpcy5pc05vdEVtcHR5KGNoYXIpICYmIGNoYXIubGVuZ3RoID09PSAxICYmIGNoYXIubWF0Y2goL1xcU3wgLyk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRJdGVtVmFsdWUob2JqLCAuLi5wYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNGdW5jdGlvbihvYmopID8gb2JqKC4uLnBhcmFtcykgOiBvYmo7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBmaW5kTGFzdEluZGV4KGFyciwgY2FsbGJhY2spIHtcbiAgICAgICAgbGV0IGluZGV4ID0gLTE7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNOb3RFbXB0eShhcnIpKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gYXJyLmZpbmRMYXN0SW5kZXgoY2FsbGJhY2spO1xuICAgICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBhcnIubGFzdEluZGV4T2YoWy4uLmFycl0ucmV2ZXJzZSgpLmZpbmQoY2FsbGJhY2spKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGZpbmRMYXN0KGFyciwgY2FsbGJhY2spIHtcbiAgICAgICAgbGV0IGl0ZW07XG5cbiAgICAgICAgaWYgKHRoaXMuaXNOb3RFbXB0eShhcnIpKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGl0ZW0gPSBhcnIuZmluZExhc3QoY2FsbGJhY2spO1xuICAgICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAgICAgaXRlbSA9IFsuLi5hcnJdLnJldmVyc2UoKS5maW5kKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cbn1cbiJdfQ==