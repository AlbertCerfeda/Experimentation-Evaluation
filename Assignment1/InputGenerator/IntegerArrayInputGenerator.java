package InputGenerator;

import InputGenerator.ArrayInputGenerator;

import java.util.*;


/**
 * Generates a set of inputs to be run by the benchmarked algorithms.
 */
public class IntegerArrayInputGenerator extends ArrayInputGenerator<Integer> {
	
	
	public IntegerArrayInputGenerator(){
		super();
	}
	
	public IntegerArrayInputGenerator(IntegerArrayInputGenerator old){
		super(old);
	}
	
	public IntegerArrayInputGenerator(long seed){
		super(seed);
	}
	
	@Override
	public void generateInputs(int inputSize) {
		inputs = new ArrayList<Input<Integer>>();
		
		Integer[] raw;
		
		raw = generator.ints(inputSize).boxed().toArray(Integer[]::new);
		inputs.add(new Input("Unsorted input", raw));
		
		raw = generator.ints(inputSize).boxed().toArray(Integer[]::new);
		Arrays.sort(raw);
		inputs.add(new Input("Sorted input", raw));
		
		raw = generator.ints(inputSize).boxed().toArray(Integer[]::new);
		Arrays.sort(raw, Collections.reverseOrder());
		inputs.add(new Input("Sorted reverse input", raw));
	}
}
