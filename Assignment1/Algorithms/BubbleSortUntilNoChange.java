package Algorithms;

import Benchmark.BenchmarkAlgo;

import java.lang.reflect.Array;

public final class BubbleSortUntilNoChange <T extends Comparable<T>> implements Sorter<T>, BenchmarkAlgo {
	private T[] items;
	
	public BubbleSortUntilNoChange(Class<T> itemsClass) {
		items = (T[])Array.newInstance(itemsClass,0);
	}
	@Override
	public void parseArguments(Object... args){
		items=(T[]) args[0];
	}
	
	@Override
	public void runSetup(){
		boolean changed;
		do{
			changed=false;
			for (int i=0; i<items.length-1; i++){
				break;
			}
		} while (changed);
	}
	
	@Override
	public void runAlgorithm(){
		sort(items);
	}
	
	
	public void sort(final T[] items){
		boolean changed;
		do {
			changed = false;
			for (int i = 0; i < items.length - 1; i++) {
				if (items[i].compareTo(items[i + 1]) > 0) {
					final T item = items[i];
					items[i] = items[i + 1];
					items[i + 1] = item;
					changed = true;
				}
			}
		} while (changed);
	}
	
}
