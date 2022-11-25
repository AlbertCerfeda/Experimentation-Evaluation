package InputGenerator;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
/**
 * Generates a set of inputs to be run by the benchmarked algorithms.
 */
public class LongArrayInputGenerator extends ArrayInputGenerator<Long> {
	
	
	public LongArrayInputGenerator(){
		super();
	}
	
	public LongArrayInputGenerator(ArrayInputGenerator old){
		super(old);
	}
	
	public LongArrayInputGenerator(long seed){
		super(seed);
	}
	
	@Override
	public void generateInputs(int inputSize) {
		inputs = new ArrayList<Input<Long>>();
		
		Long[] raw;
		
		raw = generator.longs(inputSize).boxed().toArray(Long[]::new);
		inputs.add(new Input("Unsorted LONG input", raw));
		
		raw = generator.longs(inputSize).boxed().toArray(Long[]::new);
		Arrays.sort(raw);
		inputs.add(new Input("Sorted LONG input", raw));
		
		raw = generator.longs(inputSize).boxed().toArray(Long[]::new);
		Arrays.sort(raw, Collections.reverseOrder());
		inputs.add(new Input("Sorted LONG reverse input", raw));
	}
}
