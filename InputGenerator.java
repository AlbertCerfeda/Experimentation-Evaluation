import java.util.ArrayList;

/**
 * Generates a set of inputs to be run by the benchmarked algorithms.
 */
public class InputGenerator {
	
//	final String seed = "ABC";
	private ArrayList<Input<Integer[]>> inputs;
	
	public void generateInputs() {
		inputs =new ArrayList();
		
		inputs.add(new Input<>("Unsorted input", new Integer[]{1, 5, 2}));
		inputs.add(new Input<>("Sorted input", new Integer[]{1, 2, 3}));
		inputs.add(new Input<>("Sorted reverse input", new Integer[]{5, 2, 1}));
	}
	
	public ArrayList<Input<Integer[]>> getInputs(){
		return inputs;
	}
}
