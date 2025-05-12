import os
import random

class Gene:
    def __init__(self):
        self.gene = random.randint(0, 1)

    def mutate(self):
        self.gene = 1 if self.gene == 0 else 0

    def __repr__(self):
        return str(self.gene)

class Chromosome:
    def __init__(self):
        self.genes = [Gene() for _ in range(10)]

    def mutate(self):
        for gene in self.genes:
            if random.random() > 0.5:
                gene.mutate()

class DNA:
    def __init__(self):
        self.chromosomes = [Chromosome() for _ in range(10)]

    def mutate(self):
        for chromosome in self.chromosomes:
            chromosome.mutate()

    def is_perfect(self):
        for chromosome in self.chromosomes:
            for gene in chromosome.genes:
                if gene.gene == 0:
                    return False
        return True

class Organism:
    def __init__(self, dna, mutation_probability):
        self.dna = dna
        self.mutation_probability = mutation_probability

    def mutate(self):
        if random.random() < self.mutation_probability:
            self.dna.mutate()

generations = 0
organism = Organism(DNA(), 0.9)

while not organism.dna.is_perfect():
    organism.mutate()
    generations += 1
    for chromosome in organism.dna.chromosomes:
        print(chromosome.genes)
    os.system("cls")  # Clear screen on Windows (optional)

print("Perfect DNA found in", generations, "generations")
