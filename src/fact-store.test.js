import { FactStore } from "./fact-store.js";

test('correctly distinguishes placeholder and regular arguments', () => {
    const fs = new FactStore();
    expect(fs.isPlaceholderArg('A')).toBe(true);
    expect(fs.isPlaceholderArg('AbAc')).toBe(true);
    expect(fs.isPlaceholderArg('aBaC')).toBe(false);
})

test('correctly matches candidate and fact arguments', () => {
    const fs = new FactStore();
    const arr1 = ['lucy', 'linus'];
    const arr2 = ['lucy', 'charlie']
    expect(fs.isMatch(arr1, arr2)).toBe(false);
    expect(fs.isMatch(arr1, arr1)).toBe(true);
})

test('correctly creates candidate array from query args with placeholders', () => {
    const fs = new FactStore();
    const queryArgs = ['A', 'lucy', 'B'];
    const factArgs = ['linus', 'lucy', 'charlie'];
    expect(fs.createCandidate(queryArgs, factArgs, {})).toEqual(['linus', 'lucy', 'charlie'])
})

test('correctly stores input', () => {
    const fs = new FactStore();
    fs.input('is_a_cat', ['lucy']);
    fs.input('is_a_cat', ['spot']);
    fs.input('likes', ['meg', 'bicycles']);
    const facts1 = fs.getFacts('likes');
    const facts2 = fs.getFacts('is_a_cat');
    expect(facts1).toEqual([['meg', 'bicycles']]);
    expect(facts2).toEqual([['lucy'], ['spot']]);
})