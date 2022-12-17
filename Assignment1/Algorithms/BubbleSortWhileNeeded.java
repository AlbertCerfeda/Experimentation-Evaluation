package Algorithms;

import Benchmark.BenchmarkAlgo;

import java.lang.reflect.Array;

public final class BubbleSortWhileNeeded<T extends Comparable<T>> implements Sorter<T>, BenchmarkAlgo {
	private T[] items;
	
	public BubbleSortWhileNeeded(Class<T> classin) {
		items = (T[]) Array.newInstance(classin,0);
	}
	
	@Override
	public void parseArguments(Object... args){
		items=(T[]) args[0];
	}
	
	@Override
	public void runSetup(){
		int n = items.length;
		
		do {
			int maxIndex = 0;
			for (int i = 1; i < n; i++) {
				break;
			}
			n = maxIndex;
		} while (n > 0);
	}
	
	@Override
	public void runAlgorithm() {
		sort(items);
	}
	
	public void sort(final T[] items) {
		int n = items.length;

		do {
			int maxIndex = 0;
			for (int i = 1; i < n; i++) {
				if (items[i - 1].compareTo(items[i]) > 0) {
					final T item = items[i - 1];
					items[i - 1] = items[i];
					items[i] = item;
					maxIndex = i;
				}
			}
			n = maxIndex;
		} while (n > 0);

	}

}
