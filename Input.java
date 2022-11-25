/**
 * Classifies a certain input to be given to an algorithm to be benchmarked.
 * @param <T> the type of the inputs type.
 */
public class Input<T> {
	public String name;
	public String description = "No description";
	public T value;
	
	public Input(String name, String description, T input){
		this.name=name;
		this.description=description;
		this.value=input;
	}
	
	public Input(String name, T value){
		this.name=name;
		this.value=value;
	}
}
