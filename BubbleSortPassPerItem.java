import java.lang.reflect.Array;

public final class BubbleSortPassPerItem<T extends Comparable<T>> implements Sorter<T>, BenchmarkAlgo {
	private T[] items;
	
	public BubbleSortPassPerItem(Class<T> classin) {
		items = (T[]) Array.newInstance(classin,0);
	}
	@Override
	public void parseArguments(Object... args){
		items=(T[]) args[0];
	}
	
	@Override
	public void runSetup(){
		for (int pass = 0; pass < items.length; pass++) {
			for (int i = 0; i < items.length - 1; i++) {
				break;
			}
			break;
		}
	}
	
	@Override
	public void runAlgorithm(){
		sort(items);
	}
	
	public void sort(final T[] items) {
		for (int pass = 0; pass < items.length; pass++) {

			for (int i = 0; i < items.length - 1; i++) {
				if (items[i].compareTo(items[i + 1]) > 0) {
					final T item = items[i];
					items[i] = items[i + 1];
					items[i + 1] = item;
				}
			}
		}
	}

}
