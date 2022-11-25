package InputGenerator;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;

/**
 * Generates a set of inputs to be run by the benchmarked algorithms.
 */
public class StringArrayInputGenerator extends ArrayInputGenerator<String> {
	private int minsize = 5;
	private int maxsize = 5;
	
	
	public StringArrayInputGenerator(int minsize, int maxsize){
		super();
		this.minsize = minsize;
		this.maxsize = maxsize;
	}
	
	public StringArrayInputGenerator(ArrayInputGenerator old, int minsize, int maxsize){
		super(old);
		this.minsize=minsize;
		this.maxsize=maxsize;
	}
	
	@Override
	public void generateInputs(int inputSize) {
		inputs = new ArrayList<Input<String>>();
		String[] strings;
		
		strings = generateArrayOfStrings(minsize, maxsize, inputSize);
		inputs.add(new Input("Unsorted STRING input", strings));
		
		strings = generateArrayOfStrings(minsize, maxsize, inputSize);
		Arrays.sort(strings, String::compareTo);
		inputs.add(new Input("Sorted STRING input", strings));
		
		strings = generateArrayOfStrings(minsize, maxsize, inputSize);
		Arrays.sort(strings, Collections.reverseOrder());
		inputs.add(new Input("Sorted STRING reverse input", strings));
	}
	
	private String[] generateArrayOfStrings(int minStrsize, int maxStrsize, int arraysize) {
		String[] strings = new String[arraysize];
		for(int n=0; n<arraysize; n++) {
			int size = (int) (minStrsize+(generator.nextFloat()*(maxStrsize-minStrsize)));
			
			int a_int = 97; // letter 'a'
			int z_int = 122; // letter 'z'
			StringBuilder buffer = new StringBuilder(size);
			for (int i = 0; i < size; i++) {
				buffer.append((char) (a_int + (int) (generator.nextFloat() * (z_int - a_int + 1))));
			}
			strings[n] = buffer.toString();
		}
		return strings;
	}
	
}
